import common from 'blog-admin/common';
export default Ember.Route.extend({
	model:function(params){
		var id=params.id;
		if(!id){
			common.tips.error("栏目id不能为空!");
			this.transitionTo("core.column");
			return false;	
		}
		var articlesDefer=Ember.RSVP.defer();
		this.store.find("article",id).then(function(res){
			console.log(res)
			articlesDefer.resolve(res);
		},function(err){
			articlesDefer.reject(err);
		})
		return Ember.RSVP.hash({
			articles:articlesDefer.promise
		})
	},
	setupController:function(c,m){
		c.setProperties(m);
	},
	actions:{
		error:function(err){
			common.tips.error(err);
		}
	}
})