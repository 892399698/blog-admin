export default Ember.Component.extend({
    tagName: "a",
    classNames: "btn btn-default",
    click: function() {
        var action = this.get("action");
        var route = this.get("route");
        if (route) {
            currentRouter.transitionTo(route);
        } else {
            action == "forward" ? history.forward() : history.back();
        }
    },
    didInsertElement: function() {
        var el = this.$();
        var type = this.get("type");
        var action = this.get("action") || "back";
        var text = el.text();

        !text && el.html(action == "forward" ? "前进" : "返回");
        (type == "cancel") && el.html("取消");
        !text && !type && el.addClass("btn-sm");
        el.addClass("btn-" + action);

        if (type == "nobtn") {
            el.removeClass("btn btn-default");
        }
    }
});