import SelectObject from "./cp-select";
import common from "blog-admin/common";
/**
 * 参数:
 * enableCurrentUser   true|false  下拉选项中是否显示"当前用户"选项
 * agents              array       客服
 * value               int         选中的客户Id
 */
export default SelectObject.extend({
    init: function() {
        var self=this;
        Ember.$.get(UDD.urls.apiBase+"/columns").then(function(res){
            if(res.code===1000){
                self.set("content",res.columns);
                console.log(self.get("content"));
            }else{
                common.tips.error(res.msg);
            }
        })
        this._super(...arguments);
    },
   
    optionLabelPath: "name",
    optionValuePath: "_id"
})