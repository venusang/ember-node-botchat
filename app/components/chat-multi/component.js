import Component from "@ember/component";
import { set } from "@ember/object";
import { inject as service } from "@ember/service";

export default Component.extend({
  selectedUser: null,
  pusher: service(),
  userName: null,
  rooms: null,
  init() {
    this._super(...arguments);
  },
  didInsertElement() {
    const chatManager = this.pusher.createChatManager();
    chatManager
      .connect()
      .then(currentUser => {
        set(this, "rooms", currentUser.rooms);
      })
      .catch(error => {
        /* eslint-disable */
        console.error("error:", error);
      });
  }
});
