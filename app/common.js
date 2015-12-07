/*公用js*/

var common = {
    injectData: function(name, data, regType) {
        var regName = (regType || "default") + ":" + name;
        if (!name) return;

        currentApp.register(regName, data || {}, {
            instantiate: false
        });
        currentApp.inject("controller", name, regName);
        currentApp.inject("route", name, regName);
        currentApp.inject("component", name, regName);
        currentApp.inject("model", name, regName);
    },
};
export default common;
