import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

let App;
var baseURL=location.protocol + "//" +location.host;
var urls={
	base:baseURL,
	apiBase:baseURL+"/blog_interface",
	login:baseURL+"/users/sign_in"
}

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
