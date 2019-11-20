import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { triggerKeyEvent, fillIn, render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Unit | Component | chat-bot", function(hooks) {
  setupRenderingTest(hooks);

  test("should set message on submit", async function(assert) {
    await render(hbs`<ChatBot />`);
    await fillIn("input.send-chat", "Eggs are good");
    await triggerKeyEvent(".send-chat", "keydown", 13);

    let message = this.element.getElementsByClassName("send-chat")[0].value;
    assert.equal(message, "Eggs are good");
  });
});
