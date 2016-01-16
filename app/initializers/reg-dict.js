import common from "../common";

export default {

    name: 'reg-dict',
    initialize: function (container, app) {


        var statusList = Ember.makeArray([{
            name: "开放浏览",
            id: 1
        }, {
            name: "待审核",
            id: 2
        }, {
            name: "删除",
            id: 3
        }]);
        console.log(statusList)
        // container.register("dict:status", Ember.ArrayProxy.extend({content: statusList}));

        // ["priorities", "platforms", "states", "function_type", "content_type", "customer_permission", "agent_permission"].forEach(function (i) {
        //     app.inject("controller", i + "_dict", "dict:" + i);
        //     app.inject("route", i + "_dict", "dict:" + i);
        //     app.inject("view", i + "_dict", "dict:" + i);
        //     //app.inject("model", i, "dict:" + i);
        // });
// var status_dict=Ember.ArrayProxy.extend({content: statusList});
// console.log(status_dict)
// console.log(status_dict.findBy("id",1))
        common.injectData("status_dict", statusList, "dict:status");
        // common.injectData("status_dict", Ember.ArrayProxy.extend({content: statusList}), "dict:status");
    }
};
