# -*- coding: utf-8 -*-

from openerp import models, fields, api
from openerp import http

# class myaddons/auto_refresh(models.Model):
#     _name = 'myaddons/auto_refresh.myaddons/auto_refresh'

#     name = fields.Char()
#     value = fields.Integer()
#     value2 = fields.Float(compute="_value_pc", store=True)
#     description = fields.Text()
#
#     @api.depends('value')
#     def _value_pc(self):
#         self.value2 = float(self.value) / 100

class refresh(models.AbstractModel):
    _name = 'auto_refresh.sender'
    _description = 'send message from server'

    @api.model
    def send(self, msg):
        self.env['auto_refresh.task'].create({"name": "task xxx"})
        self.env['bus.bus'].sendone("task_updated", msg)
        req = http.request.httprequest
        print 'Remote request ip address is %s' % req.remote_addr
        return True


class task(models.Model):
    _name = 'auto_refresh.task'
    _description = 'auto refresh task'

    name = fields.Char(string='Name', required='True', help='')
    note = fields.Text(string='Note', help='')
    create_date = fields.Datetime(string='Created Date', default=fields.Datetime.now, help='')

    @api.model
    def onMsg(self, msg):
        print msg
        self.create({"name": "received", "note": msg})
        self.env['bus.bus'].sendone("task_updated", msg)
        return 0;


