export default Ember.Component.extend({
    classNames: ["cp-toolbar"],
    layout: Ember.Handlebars.compile("{{yield}}"),
    didInsertElement: function() {
        var el = this.$();
    }
});