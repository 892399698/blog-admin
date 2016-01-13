import common from "blog-admin/common";
var g = Ember.get;
var s = Ember.set;
export default Ember.Component.extend({
    actions: {
        submit: (data) => {
            var self = this;
            if (!data) {
                return false;
            }
            if (!g(data, "title")) {
                common.tips.error("文章标题不能为空！");
                return false;
            }
            if (!g(data, "column_id")) {
                common.tips.error("栏目不能为空！");
                return false;
            }
            var id = g(data, "id");
            var saveData = [];
            if (id) {
              saveData = data;
            } else {
                saveData = currentContainer.lookup('service:store').createRecord('article', data);
            }
            saveData.save().then((res) => {
                common.tips.success("保存成功！");
                slef.get("currentController").transitionToRoute("core.article");
            }, (res) => {
                var err = res.msg || "保存失败！";
                common.tips.error(err);
            })


        }
    }
})
