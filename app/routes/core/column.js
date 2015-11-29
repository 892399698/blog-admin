export default Ember.Route.extend({
	model:function(){
		return Ember.RSVP.hash({
			// articles:this.store.find("article"),
		})
	},
	setupController:function(c,m){
		c.setProperties(m);
	}
})