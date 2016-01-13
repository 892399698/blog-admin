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
        var self = this;
        Ember.$.get(UDD.urls.apiBase + "/columns").then(function(res) {
            if (res.code === 1000) {
                self.set("content", res.columns);
                // console.log(self.get("content"));
                self.setVal();
            } else {
                common.tips.error(res.msg);
            }
        })
        this._super(...arguments);
    },
    setVal: function(val) {
        var value = this.get("value") || val,
            content = this.get("content"),
            valuePath = this.get("optionValuePath"),
            contentFirst = content.get("firstObject"),
            selectedValue = this.get("selectedValue");
        if (value) {
            this.set("selectedValue", content.findBy(valuePath, value));
            selectedValue = this.get("selectedValue");
        }
        if (selectedValue) {
            this.set("value", Ember.get(selectedValue, valuePath));
            value = this.get("value");
        }
        if (!value && !selectedValue) {
            if (!this.get("prompt")) {
                this.set("selectedValue", contentFirst);
            }
        }
    },
    optionLabelPath: "name",
    optionValuePath: "_id"
})
