import common from 'blog-admin/common';
var g=Ember.get;
var s=Ember.set;
export default Ember.Controller.extend({
    actions: {
        toggleColumn:function(item){
            // item.toggleProperty("display");
            var display=g(item,"display");
            s(item,"display",!display);
        },
        del: function(item) {
            var self = this;
            if (!item) {
                common.tips.error("删除时没有提交数据！");
            }
            // var id=item._id;
            self.setProperties({
                "ifDialog": true,
                "dialogCallback": "delCallback",
                "dialogContent": "确定删除栏目？",
                "dialogData": item

            });
        },
        delCallback: function() {
            var self = this;
            var item = this.get("dialogData");
            var ajaxing = self.get("ajaxing");
            if (ajaxing) {
                return false;
            }
            self.set("ajaxing", true);
            $.ajax({
                url: UDD.urls.apiBase + "/columns/" + item._id,
                method: "DELETE",
            }).then(function(res) {
                if (res.code === 1000) {
                    // self.store.deleteRecord(item);
                    self.send("refreshModel");
                } else {
                    common.tips.error(res.msg);
                }
            }).always(function() {
                self.set("ajaxing", false);
                self.set("ifDialog", false);
            })

            // self.store.findBy()
        }
    }
})
