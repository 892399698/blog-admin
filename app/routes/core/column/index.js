export default Ember.Route.extend({
	model:function(){
		return Ember.RSVP.hash({
			columns:this.store.find("column"),
		})
	},
	setupController:function(c,m){
		c.setProperties(m);
	}
})	