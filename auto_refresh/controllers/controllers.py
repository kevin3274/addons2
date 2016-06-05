# -*- coding: utf-8 -*-
from openerp import http

# class Myaddons/autoRefresh(http.Controller):
#     @http.route('/myaddons/auto_refresh/myaddons/auto_refresh/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/myaddons/auto_refresh/myaddons/auto_refresh/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('myaddons/auto_refresh.listing', {
#             'root': '/myaddons/auto_refresh/myaddons/auto_refresh',
#             'objects': http.request.env['myaddons/auto_refresh.myaddons/auto_refresh'].search([]),
#         })

#     @http.route('/myaddons/auto_refresh/myaddons/auto_refresh/objects/<model("myaddons/auto_refresh.myaddons/auto_refresh"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('myaddons/auto_refresh.object', {
#             'object': obj
#         })

class WeUI(http.Controller):

    @http.route('/wx')
    def index(self, **kw):
        return http.request.render('auto_refresh.wx')