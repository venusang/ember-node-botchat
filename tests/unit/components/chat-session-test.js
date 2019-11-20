import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Component | chat session", function(hooks) {
  setupTest(hooks);

  test("should correctly concat roomIndex for messageList", function(assert) {
    const chatSession = this.owner.lookup("component:chat-session");
    chatSession.set("roomIndex", "123");

    assert.equal(chatSession.get("messageList"), "message-list-123");
  });

  test("should correctly concat roomIndex for messageText", function(assert) {
    const chatSession = this.owner.lookup("component:chat-session");
    chatSession.set("roomIndex", "456");

    assert.equal(chatSession.get("messageText"), "message-text-456");
  });

  test("should get roomIndex on loadChatSession", function(assert) {
    const chatSession = this.owner.lookup("component:chat-session");
    const roomIndex = chatSession.set("roomIndex", "232423");
    chatSession.loadChatSession();

    assert.equal(chatSession.get("roomIndex"), roomIndex);
  });

  test("should set currentUser on loadChatSession", function(assert) {
    const chatSession = this.owner.lookup("component:chat-session");
    const userName = chatSession.set("currentUser", "abc");
    chatSession.loadChatSession();

    assert.equal(chatSession.get("currentUser"), userName);
  });

  test("should set roomName on loadChatSession", function(assert) {
    const chatSession = this.owner.lookup("component:chat-session");
    const roomName = chatSession.set("roomName", "Candidate Name");

    chatSession.loadChatSession();

    assert.equal(chatSession.get("roomName"), roomName);
  });
});
