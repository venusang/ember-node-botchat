import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Service | pusher", function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test("Pusher service subscribes to channel", function(assert) {
    let service = this.owner.lookup("service:pusher");

    assert.ok(service.subscribeToChannel());
  });
});
