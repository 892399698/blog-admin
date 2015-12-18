export default Ember.Component.extend({

    didInsertElement: function() {
        this.onSelectCustomerId();
    },
    tagName: "",
    inputSize: "input-md",
    onlyId: false,
    layout: function() {
        return Ember.Handlebars.compile(
            "{{select-2" +
            ' placeholder="请选择栏目"' +
            ' value= column' +
            ' typeaheadSearchingText="正在查找..."' +
            ' typeaheadNoMatchesText="没有找到任何栏目，根据关键字\'%@\'"' +
            ' typeaheadErrorText="查询失败: %@"' +
            ' minimumInputLength=1' +
            ' maximumInputLength=20' +
            ' query="queryColumns"' +
            ' optionLabelPath="name"' +
            ' cssClass="new-column-drop"' +
            ' inputSize=inputSize' +
            " }}"
        );
    }.property("onlyId"),

    onSelectCustomer: function() {
        this.set("columnId", this.get("column._id"));
    }.observes("column"),

    onSelectColumnId: function() {
        var customerId = this.get("columnId");
        if (customerId) {
            Ember.$.get(UDD.uls.apiBase + "/columns/" + this.get("columnId")).then(
                (res) => {
                    if (res.code === 1000) {
                        this.set("column", res.columns)
                    }
                }
            )
        }
    }.observes("columnId"),

    actions: {
        queryColumns: function(query, deferred) {
            this.get("store").find('column', {
                    q: query.term
                })
                .then(function(data) {
                    deferred.resolve(data);
                }, deferred.reject);
        }
    }
});

