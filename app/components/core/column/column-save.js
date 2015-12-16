export default Ember.Component.extend({
  actions:{
    submit:function(data){
      this.sendAction("submitAction");
    }
  }
})