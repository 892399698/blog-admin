import common from "blog-admin/common";
var g = Ember.get;
var s = Ember.set;
export default Ember.Component.extend({
    actions: {
        submit(data){
            var self = this;
            if (!data) {
                return false;
            }
            var column_id=g(data, "column_id");
            if (!g(data, "title")) {
                common.tips.error("文章标题不能为空！");
                return false;
            }
            if (!column_id) {
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
                self.get("currentController").transitionToRoute("core.column.show",column_id);
            }, (res) => {
                console.log(res)
                var err = res.errors || "保存失败！";
                common.tips.error(err);
            })


        }
    }
})
