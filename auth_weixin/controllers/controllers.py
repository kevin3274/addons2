# -*- coding: utf-8 -*-
from openerp import http
from openerp import SUPERUSER_ID
import logging
import urllib2
import json
from openerp.addons.auth_signup.controllers.main import AuthSignupHome as Home
from openerp.addons.web.controllers.main import db_monodb, ensure_db, set_cookie_and_redirect, login_and_redirect
from openerp.modules.registry import RegistryManager
import werkzeug

_logger = logging.getLogger(__name__)

# class AuthWeixin(http.Controller):
#     @http.route('/auth_weixin/auth_weixin/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/auth_weixin/auth_weixin/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('auth_weixin.listing', {
#             'root': '/auth_weixin/auth_weixin',
#             'objects': http.request.env['auth_weixin.auth_weixin'].search([]),
#         })

#     @http.route('/auth_weixin/auth_weixin/objects/<model("auth_weixin.auth_weixin"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('auth_weixin.object', {
#             'object': obj
#         })

class OAuthController(Home):

    @http.route()
    def web_login(self, *args, **kw):
        #检查是否是从微信环境请求
        if 'MicroMessenger' in http.request.httprequest.user_agent.string:
            pm = http.request.env['ir.config_parameter'].sudo()
            corp_id = pm.get_param('weixin.qy.corp.id')
            secret = pm.get_param('weixin.qy.secret')
            callback_base = pm.get_param('weixin.qy.callback.base')
            redirect_url = kw.get('redirect', '')
            code_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s' \
                       '&response_type=code&scope=snsapi_base&state={}#wechat_redirect' % (corp_id, '%s/auth_weixin/signin?redirect=%s' % (callback_base, redirect_url))

            return werkzeug.utils.redirect(code_url, 303)
        else:
            return super(OAuthController, self).web_login(*args, **kw)

class WeixinAuthController(http.Controller):

    @http.route('/auth_weixin/signin', type='http', auth='none')
    def signin(self, **kw):
        _logger.debug(kw)
        _logger.debug('dbname: %s', http.request.db)
        registry = RegistryManager.get(http.request.db)
        with registry.cursor() as cr:
            try:
                u = registry.get('res.users')
                credentials = u.auth_weixin(cr, SUPERUSER_ID, kw)
                cr.commit()
                redirect = kw.get('redirect', '')
                return login_and_redirect(*credentials, redirect_url=redirect)
            except Exception, e:
                _logger.exception("OAuth2: %s" % str(e))
                url = "/web/login?oauth_error=2"


    @http.route('/web/product', type='http', auth='user')
    def product(self, **kw):
        products = http.request.env['product.product'].search([])
        return http.request.render('auth_weixin.product_list', {"products": products, "user": http.request.env.user})
