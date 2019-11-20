import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Component | chat phase2", function(hooks) {
  setupTest(hooks);

  test("should correctly concat roomIndex", function(assert) {
    const chatPhase2 = this.owner.lookup("component:chat-phase2");
    chatPhase2.set("roomIndex", "123");

    assert.equal(chatPhase2.get("messageList"), "message-list-123");
  });

  test("should correctly concat roomIndex", function(assert) {
    const chatPhase2 = this.owner.lookup("component:chat-phase2");
    chatPhase2.set("roomIndex", "456");

    assert.equal(chatPhase2.get("messageText"), "message-text-456");
  });

  test("should get roomIndex on init", function(assert) {
    const chatPhase2 = this.owner.lookup("component:chat-phase2");
    const roomIndex = chatPhase2.set("roomIndex", "232423");
    chatPhase2.init();

    assert.equal(chatPhase2.get("roomIndex"), roomIndex);
  });

  test("should set currentUser on init", function(assert) {
    const chatPhase2 = this.owner.lookup("component:chat-phase2");
    const userName = chatPhase2.set("currentUser", "abc");
    chatPhase2.init();

    assert.equal(chatPhase2.get("currentUser"), userName);
  });

  test("should set candidateRoom on init", function(assert) {
    const chatPhase2 = this.owner.lookup("component:chat-phase2");
    const roomName = chatPhase2.set("candidateRoom", "Candidate Name");
    chatPhase2.init();

    assert.equal(chatPhase2.get("candidateRoom"), roomName);
  });
});
