export default Ember.Controller.extend({
  formatArticles:function(){
    var formatArticles=this.get("articles");
    var initColumns=this.get("initColumns")||[];
    console.log(initColumns)
    formatArticles && formatArticles.length && formatArticles.forEach((_item)=>{
      // console.log(_item);
      var id=_item.column_id;
      var column=initColumns.findBy("_id",id)||{};
      var column_name=Ember.get(column,"name");
      Ember.set(_item,"column_name",column_name||"");
    })
    console.log(formatArticles)
    return formatArticles;
  }.property("articles"),
})