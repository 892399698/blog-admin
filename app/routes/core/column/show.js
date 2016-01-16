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
		// this.store.find("article",id).then(function(res){
		// 	console.log(res)
		// 	articlesDefer.resolve(res);
		// },function(err){
		// 	articlesDefer.reject(err);
		// })
		var p={
			column_id:id
		}
		Ember.$.get(UDD.urls.apiBase+"/articles",p).then(function(res){
			if(res.code===1000){
				articlesDefer.resolve(res.articles);
			}else{
				articlesDefer.reject(res.msg);
				// common.tips.error(res.msg)
			}
		},function(err){
			articlesDefer.reject("获取文章列表的错误!");
		})
		// this.store.find("article",id).then(function(res){
		// 	console.log(res)
		// 	articlesDefer.resolve(res);
		// },function(err){
		// 	articlesDefer.reject(err);
		// })
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