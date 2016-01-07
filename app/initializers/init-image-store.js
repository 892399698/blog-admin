export default {
  name: 'init-image-store',
  initialize: function (container, app) {
    //var imageStore = Ember.ArrayProxy.create({content:(window.localStorage && window.localStorage.imageStore) ? window.localStorage.imageStore : []});
    var imageStore = Ember.ArrayProxy.create({content:[]});

    container.register("config:image-store", imageStore, {
      instantiate: false
    });
    app.inject("component", "imageStore", "config:image-store");
  }
};
