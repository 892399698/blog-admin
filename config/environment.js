// /* jshint node: true */

// module.exports = function(environment) {
//   var ENV = {
//     modulePrefix: 'blog-admin',
//     environment: environment,
//     baseURL: '/entry/',
//     locationType: 'auto',
//     EmberENV: {
//       FEATURES: {
//         // Here you can enable experimental features on an ember canary build
//         // e.g. 'with-controller': true
//       }
//     },
//     EMBER_CLI_INJECT_LIVE_RELOAD_PORT:false,
//     APP: {
//       // Here you can pass flags/options to your application instance
//       // when it is created
//     }
//   };

//   if (environment === 'development') {
//     // ENV.APP.LOG_RESOLVER = true;
//     // ENV.APP.LOG_ACTIVE_GENERATION = true;
//     // ENV.APP.LOG_TRANSITIONS = true;
//     // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
//     // ENV.APP.LOG_VIEW_LOOKUPS = true;
//   }

//   if (environment === 'test') {
//     // Testem prefers this...
//     ENV.baseURL = '/';
//     ENV.locationType = 'none';

//     // keep test console output quieter
//     ENV.APP.LOG_ACTIVE_GENERATION = false;
//     ENV.APP.LOG_VIEW_LOOKUPS = false;

//     ENV.APP.rootElement = '#ember-testing';
//   }

//   if (environment === 'production') {

//   }

//   return ENV;
// };


module.exports = function (environment) {
  var ENV = {
    modulePrefix: 'blog-admin',
    environment: environment,
    baseURL: '/entry/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },


    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      //host: 'http://bigdog.udeskdog.com/spa1'
      //host: 'http://mengqx.udesk.cn:3000'
      //host: "http://localhost:2403"
    }
  };
  ENV.contentSecurityPolicy = {
    'style-src': "'self' 'unsafe-inline'",
    'script-src': "'self' 'localhost' 'unsafe-inline' 'unsafe-eval'",
    'connect-src': "'self' *", // Allow data (ajax/websocket) from http://localhost:3000
    'default-src': "'none'",
    //'font-src': "'self' data: use.typekit.net",
    'img-src': "'self' *"
    //,'frame-src': "s-static.ak.facebook.com static.ak.facebook.com www.facebook.com"
  }
  // ENV['simple-auth'] = {
  //   authorizer: 'simple-auth-authorizer:devise',
  //   store: 'simple-auth-session-store:local-storage'
  // }
  // ENV['simple-auth-devise'] = {
  //   serverTokenEndpoint: '/spa1/login',
  //   identificationAttributeName: 'email'
  // };
  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    // Testem prefers this...
//        ENV.baseURL = 'http://localhost:4200';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = 'http://localhost:4200';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
     ENV.APP.LOG_RESOLVER = false;
     ENV.APP.LOG_ACTIVE_GENERATION = false;
     ENV.APP.LOG_TRANSITIONS = false;
     ENV.APP.LOG_TRANSITIONS_INTERNAL = false;
     ENV.APP.LOG_VIEW_LOOKUPS = false;
  }

  return ENV;
};