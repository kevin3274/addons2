# -*- coding: utf-8 -*-

from openerp import models, fields, api

# class auth_weixin(models.Model):
#     _name = 'auth_weixin.auth_weixin'

#     name = fields.Char()
#     value = fields.Integer()
#     value2 = fields.Float(compute="_value_pc", store=True)
#     description = fields.Text()
#
#     @api.depends('value')
#     def _value_pc(self):
#         self.value2 = float(self.value) / 100

class OAuthProvider(models.Model):
    _inherit = 'auth.oauth.provider'

    weixin_qy_corp_id = fields.Char(string='Weixin CorpID', help='微信企业号CorpID')
    weixin_qy_secret = fields.Char(string='Weixin Secret', help='微信企业号Secret')
