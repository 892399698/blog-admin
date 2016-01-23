import common from 'blog-admin/common';
var g = Ember.get;
export default Ember.Controller.extend({
    formatArticles: function() {
        var formatArticles = this.get("articles");
        var initColumns = this.get("initColumns") || [];
        // console.log(initColumns)
        formatArticles && formatArticles.length && formatArticles.forEach((_item) => {
            var id = g(_item, "column_id");
            var column = initColumns.findBy("id", id) || {};
            var column_name = g(column, "name");
            Ember.set(_item, "column_name", column_name || "");
        })
        console.log(formatArticles)
        return formatArticles;
    }.property("articles"),
    actions: {
        delete(id) {
                if (!id) {
                    common.tips.error("文章id为空!");
                    return false;
                }
                this.setProperties({
                    "ifDialog": true,
                    dialogContent: "确定删除文章么?",
                    dialogCallback: "deleteCallback",
                    delId: id
                });
            },
            deleteCallback: function() {
                var self = this;
                var ajaxing = self.get("ajaxing");
                if (ajaxing) {
                    return false;
                }
                self.set("ajaxing", true);
                Ember.$.ajax({
                    method: "DELETE",
                    url: UDD.urls.apiBase + "/articles/" + this.get("delId"),
                }).then(function(res) {
                    if (res.code === 1000) {
                        self.send("refreshModel");
                    } else {
                        common.tips.error(res.msg);
                    }
                }).always(function() {
                    self.set("ajaxing", false);
                    self.set("ifDialog", false);
                })
            }
    }
})
