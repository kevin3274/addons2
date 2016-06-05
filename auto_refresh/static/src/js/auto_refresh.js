/**
 * Created by kevin on 16/4/27.
 */
odoo.define('auto_refresh', function(require){
    var bus = require("bus.bus").bus;
    bus.add_channel("task_updated")
    bus.start_polling();

    var ListView =  require('web.ListView');
    var RefreshListView = ListView.extend({
        init(parent, dataset, view_id, options){
            this._super(parent, dataset, view_id, options)
            console.log('refresh list view')
        },
        start(){
            var self = this;
            bus.on("notification", null, function(notis){
                console.log(notis);
                self.reload();
            });
            return this._super();
        }

    });

    var core = require('web.core');
    core.view_registry.add('refresh_list', RefreshListView);
});