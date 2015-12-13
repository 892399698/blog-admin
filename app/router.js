import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.resource("core",function(){
		this.route("column",function(){
			this.route("edit",{path:"edit/:id"})
		});
		this.route("commit");
	})
	// this.resource();
	// this.route("");
	// this.route("login");
});

export default Router;
