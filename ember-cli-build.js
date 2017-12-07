/* eslint-env node */
"use strict";

const EmberApp = require("ember-cli/lib/broccoli/ember-app");

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
  });

  app.import("vendor/qrcodelib.js");
  app.import("vendor/webcodecamjquery.js");

  return app.toTree();
};
