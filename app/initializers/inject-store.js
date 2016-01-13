export default {
    name: 'inject-store',
    initialize: function(container, app) {
        app.inject("component", "store", "service:store");
    }
};