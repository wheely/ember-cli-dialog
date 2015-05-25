/* global startApp */

var run = Ember.run, manager, app;

module("manager/behaviour", {
  setup: function() {
    app = startApp();
    manager = app.registry.lookup('dialog:manager');
    run(manager, manager.reset);
  },
  teardown: function() {
    run(app, app.destroy);
    run(manager, manager.destroy);
  }
});

test("The manager should fire the events", function() {
  var on_create = async(function(dialog) { ok(true, "manager triggered create"); dialog.close(); }, 1000);
  var on_close = async(function(dialog) { ok(true, "manager triggered close"); }, 1000);

  run(function() {
    manager.on('create', on_create);
    manager.on('close', on_close);
    manager.alert("Some template goes here");
  });
});

test("The promises should work fine", function() {
  var accept_close = async(function(dialog) { ok(true, "the promise was resolved on accept click"); }, 10000);
  var decline_close = async(function(dialog) { ok(true, "the promise was rejected on decline click"); }, 10000);

  run(function() {
    manager.confirm("Some template goes here").then(accept_close);
    run.scheduleOnce('afterRender', this, function() {
      var dialog = manager.getDialog(manager.get('active'));
      var button = dialog.$('.' + dialog.acceptClass);
      console.log(button[0]);
      button[0].click();
    });

    manager.confirm("Some template goes here").catch(decline_close);
    run.scheduleOnce('afterRender', this, function() {
      var dialog = manager.getDialog(manager.get('active'));
      var button = dialog.$('.' + dialog.declineClass);
      console.log(button[0]);
      button[0].click();
    });

    // For the future release of the ember dialog library, when presenter object will
    // be decomposed to provide own behaviour for alert, confirm and so on types of dialog.
    // manager.one('create', function(dialog) { dialog.close(); });
    // manager.confirm("Some template goes here").fail(confirm_close);
  });
});

test("The promises should work fine for every dialog type", function() {
  var alert_close = async(function(dialog) { ok(true, "the alert dialog should close with resolving a promise"); });
  // var confirm_close = async(function(dialog) { ok(true, "the confirm dialog should close with rejection a promise"); });

  run(function() {
    manager.one('create', function(dialog) { dialog.close(); });
    manager.alert("Some template goes here").then(alert_close);

    // For the future release of the ember dialog library, when presenter object will
    // be decomposed to provide own behaviour for alert, confirm and so on types of dialog.
    // manager.one('create', function(dialog) { dialog.close(); });
    // manager.confirm("Some template goes here").fail(confirm_close);
  });
});
