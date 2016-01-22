export default Ember.Route.extend({
  // model(params){
  //   return this.store.find("article",params.id);
  // }
  model:function(params){
    return this.store.find("article",params.id);
  }
})