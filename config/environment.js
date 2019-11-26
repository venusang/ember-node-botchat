"use strict";

module.exports = function(environment) {
  let ENV = {
    modulePrefix: "ember-node-botchat",
    environment,
    rootURL: "/",
    locationType: "auto",
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      // PUSHER CREDENTIALS
      PUSHER_TOKEN_PROVIDER_URL:
        "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/f6dbf701-0367-4880-9ea7-b7f0e8b5fb01/token",
      PUSHER_APP_ID: "902808",
      PUSHER_APP_KEY: "88bb13d1744ecc27c52f",
      PUSHER_APP_SECRET: "42949f99d2f23da02d69",
      PUSHER_APP_CLUSTER: "us3",
      PUSHER_DEVELOPER_ACCESS_TOKEN: "6ea3a2e1da0f4efbaaace4980e8c5407",
      PUSHER_INSTANCE_LOCATOR: "v1:us1:f6dbf701-0367-4880-9ea7-b7f0e8b5fb01",
      PUSHER_CHATKIT_SECRET_KEY:
        "dace1965-0856-4584-a3f6-3abc7148d6db:s6Dw9VsnfalgbIlwvkXi4P6TMRy4DBbCXdvwV00doVQ="
    }
  };

  if (environment === "development") {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === "test") {
    // Testem prefers this...
    ENV.locationType = "none";

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = "#ember-testing";
    ENV.APP.autoboot = false;
  }

  if (environment === "production") {
    // here you can enable a production-specific feature
  }

  return ENV;
};
