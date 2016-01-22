var g=Ember.get;
export default Ember.Controller.extend({
    formatArticles: function() {
        var formatArticles = this.get("articles");
        var initColumns = this.get("initColumns") || [];
        // console.log(initColumns)
        formatArticles && formatArticles.length && formatArticles.forEach((_item) => {
            var id = g(_item,"column_id");
            var column = initColumns.findBy("id", id) || {};
            var column_name = g(column, "name");
            Ember.set(_item, "column_name", column_name || "");
        })
        console.log(formatArticles)
        return formatArticles;
    }.property("articles"),
    actions:{
        
    }
})
