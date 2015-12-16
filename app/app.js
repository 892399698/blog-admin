import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';
import common from './common';

//url初始化
var baseURL=location.protocol + "//" +location.host;
var urls={
	base:baseURL,
	apiBase:baseURL+"/blog_interface",
	login:baseURL+"/users/sign_in"
}

Ember.MODEL_FACTORY_INJECTIONS = true;


var App = Ember.Application.extend({
    modulePrefix: config.modulePrefix,
    podModulePrefix: config.podModulePrefix,
    Resolver: Resolver
});

var la = loadInitializers(App, config.modulePrefix);

// export default {
//     create:function(options) {
//         Ember.RSVP.all([
//             Ember.$.get(urls.apiBase + "/init_data"),
//         ]).then(
//             ([res]) => {
                
//                 window.currentApp = App.create(options);
//                 window.currentContainer = window.currentApp.__container__;
//                 window.currentRouter = window.currentContainer.lookup("router:main");

//                 injectAppData(options);
//             }, () => {

//             }
//         )
//     }
// };


var injectAppData = function(data) {
  console.log("injectAppData=>");
  console.log(data);
    // var user = data.user;
    // var role_can = data.role_can || {};
    // var role_no = {};
    // var company = data.company || {};
    // var can_columns = company.can_columns || {};
    // for (var k in can_columns) {
    //     var _val = can_columns[k];
    //     if (_val == "true") _val = true;
    //     else if (_val == "false") _val = false;

    //     can_columns[k] = _val;
    // }

    // role_can.group_admin_user_or_company = role_can.group_admin_user || role_can.group_admin_company;

    // for (var key in role_can) {
    //     role_no[key] = !role_can[key];
    // }

    // common.injectData("role_can", Ember.Object.create(role_can));
    // common.injectData("role_no", Ember.Object.create(role_no));
    // common.injectData("callConfig", Ember.Object.create(data.ytxapp));
    // common.injectData("can_columns", can_columns);
    // common.injectData("company", company);
    // common.injectData("custom_plugin", data.custom_plugin);
    // common.injectData("currentAgents", data.agents);

    var UDD = _.extend(data, {
        // isAdmin: user.role == "admin",
        // isAgent: user.role == "agent",
        // role_can: role_can, //权限：能够访问的
        // role_no: role_no //权限：不能访问的
    });
    common.injectData("UDD", UDD);
    UDD.urls=urls;
    window.UDD = UDD;
};

// export default App;
// export default App.extend({
//     create: function(options) {
//         console.log("do")
//         Ember.RSVP.all([
//             Ember.$.get(urls.apiBase + '/init_data')
//         ]).then(
//             function(initData) {
//                 console.log(initData.code);
//                 if (initData.code === 2003) {
//                     location.replace(urls.login);
//                 }
//                 if (initData.code !== 1000) {
//                     return;
//                 }
//                 delete initData.code;
//                 console.log("do");
//                 options.urls = urls;
//                 options.apiPath = urls.apiBase;


//                 Ember.merge(options, initData);

//                 window.currentApp = App.create(options);
//                 window.currentContainer = window.currentApp.__container__;
//                 window.currentRouter = window.currentContainer.lookup("router:main");

//                 injectAppData(options);

//             },
//             function(res) {
//                 console.log(res);
//             });
//     }
// });
export default {
    create: function(options) {
        Ember.RSVP.all([
            Ember.$.get(urls.apiBase + '/init_data')
        ]).then(
            function([initData]) {
                console.log(initData.code);
                if (initData.code === 2003) {
                    location.replace(urls.login);
                }
                if (initData.code !== 1000) {
                    return;
                }
                delete initData.code;
                console.log("do");
                options.urls = urls;
                options.apiPath = urls.apiBase;


                Ember.merge(options, initData);

                window.currentApp = App.create(options);
                window.currentContainer = window.currentApp.__container__;
                window.currentRouter = window.currentContainer.lookup("router:main");

                injectAppData(options);

            },
            function(res) {
                console.log(res);
            });
    }
};
