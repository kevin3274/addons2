# -*- coding: utf-8 -*-
from openerp import http

# class WebReact(http.Controller):
#     @http.route('/web_react/web_react/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/web_react/web_react/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('web_react.listing', {
#             'root': '/web_react/web_react',
#             'objects': http.request.env['web_react.web_react'].search([]),
#         })

#     @http.route('/web_react/web_react/objects/<model("web_react.web_react"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('web_react.object', {
#             'object': obj
#         })

class WebReact(http.Controller):

    @http.route(['/react', '/react/login'])
    def index(self, **kw):
        return http.request.render("web_react.react-root", {})