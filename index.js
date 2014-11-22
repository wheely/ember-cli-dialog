'use strict';

module.exports = {
  name: 'ember-cli-dialog',

  included: function(app) {
    this._super.included(app);

    this.app.import(app.bowerDirectory + '/ember-dialog/dist/ember.dialog.min.js', {
      exports: {
        'ember-dialog/initializers/dialog-manager': ["default"],
        'ember-dialog/services/dialog-manager': ["default"],
        'ember-dialog/components/dialog': ["default"],
        'ember-dialog/utils/highest-zindex': ["default"]
      }
    });
  }
};
