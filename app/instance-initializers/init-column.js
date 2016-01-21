export default {
    name: 'init-inject-column',
    after: 'ember-data',
    initialize: function(instance) {
        var store = instance.container.lookup("service:store");
        instance.container.register("config:columns",store.find("column"), {instantiate: false});
        console.log(store.find("column"))
        instance.registry.injection("component", "initColumns", "config:columns");
        instance.registry.injection("controller", "initColumns", "config:columns");
        instance.registry.injection("route", "initColumns", "config:columns");
    }
};
