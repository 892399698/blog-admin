import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.resource("core",function(){
		this.route("column",function(){
			this.route("edit",{path:"edit/:id"});
			this.route("new");
			this.route("show",{path:"/:id"});
		});
		// 评论管理
		this.route("commit");
		// 文章管理
		this.route("article",function(){
			this.route("new");
			this.route("edit");
		});
	});
	// this.resource();
	// this.route("");
	// this.route("login");
});

export default Router;
