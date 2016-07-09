# -*- coding: utf-8 -*-

from openerp import models, fields, api
from openerp import SUPERUSER_ID
import openerp
from openerp.addons.auth_signup.res_users import SignupError
import urllib2
import json
import werkzeug
import urlparse
import logging

_logger = logging.getLogger(__name__)


CORPID='wx3099249a5f18d595'
SECRET='JsMNIGzWLFbt6ktdEJX0YTEG3rDxb9mCwfmqWdTIFrdRutrDQ2glXB-4m4nXM1Na'

class User(models.Model):
    _inherit = 'res.users'

    weixinid = fields.Char(string='企业号成员ID', help='成员UserID。对应管理端的帐号')
    weixin_uid = fields.Char(string='微信号', help='')
    weixin_access_token = fields.Char(string='Weixin Access Token', help='')

    @api.model
    def _auth_weixin_rpc(self, endpoint, **kw):
        params = werkzeug.url_encode(kw or {})
        if urlparse.urlparse(endpoint)[4]:
            url = endpoint + '&' + params
        else:
            url = endpoint + '?' + params
        f = urllib2.urlopen(url)
        response = f.read()
        return json.loads(response)

    @api.model
    def _auth_weixin_validate(self, code):
        """ return the validation data corresponding to the access token """
        pm = self.env['ir.config_parameter'].sudo()
        corp_id = pm.get_param('weixin.qy.corp.id')
        secret = pm.get_param('weixin.qy.secret')
        access_token = self._auth_weixin_rpc('https://qyapi.weixin.qq.com/cgi-bin/gettoken',
                              corpid=corp_id, corpsecret=secret).get('access_token', '')
        _logger.debug("access_token: %s", access_token)
        user_data = self._auth_weixin_rpc('https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo',
                                          access_token=access_token, code=code)
        _logger.debug('user_data: %s', user_data)
        user_id = user_data['UserId']
        #get member info
        validation = self._auth_weixin_rpc('https://qyapi.weixin.qq.com/cgi-bin/user/get',
                                           access_token=access_token, userid=user_id)
        if validation.get("errcode", 0) != 0:
            raise Exception(validation['errmsg'])
        return validation

    @api.model
    def _generate_signup_values(self, validation, params):
        weixin_uid = validation['userid']
        weixinid = validation['weixinid']
        email = validation.get('email', '')
        name = validation.get('name', email)
        return {
            'name': name,
            'login': weixinid,
            'email': email,
            'weixinid': weixinid,
            'weixin_uid': weixin_uid,
            'weixin_access_token': params['code'],
            'active': True,
        }

    @api.model
    def _auth_weixin_signin(self, validation, params):
        """ retrieve and sign in the user corresponding to provider and validated access token
            :param provider: oauth provider id (int)
            :param validation: result of validation of access token (dict)
            :param params: oauth parameters (dict)
            :return: user login (str)
            :raise: openerp.exceptions.AccessDenied if signin failed

            This method can be overridden to add alternative signin methods.
        """
        try:
            weixin_uid = validation['userid']
            user = self.search([("weixin_uid", "=", weixin_uid)])
            if not user:
                raise openerp.exceptions.AccessDenied()
            assert len(user.ids) == 1
            user.write({'weixin_access_token': params['code']})
            return user.login
        except openerp.exceptions.AccessDenied, access_denied_exception:
            if self.env.context and self.env.context.get('no_user_creation'):
                return None
            state = json.loads(params['state'])
            token = state.get('t')
            values = self._generate_signup_values(validation, params)
            _logger.debug("create new user with: %s", values)
            try:
                _, login, _ = self.signup(values, token)
                return login
            except SignupError:
                raise access_denied_exception

    @api.model
    def auth_weixin(self, params):
        _logger.debug("auth weixin %s", params)
        code = params.get('code')
        validation = self._auth_weixin_validate(code)
        # required check
        if not validation.get('userid'):
            raise openerp.exceptions.AccessDenied()

        # retrieve and sign in user
        login = self._auth_weixin_signin(validation, params)
        if not login:
            raise openerp.exceptions.AccessDenied()
        # return user credentials
        return (self._cr.dbname, login, code)

    @api.model
    def check_credentials(self, password):
        try:
            return super(User, self).check_credentials(password)
        except openerp.exceptions.AccessDenied:
            res = self.sudo().search([('id', '=', self._uid), ('weixin_access_token', '=', password)])
            _logger.debug("current user: %s-%s-%s", self._uid, password, res.ids)
            if not res:
                raise


