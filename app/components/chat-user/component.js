import Component from "@ember/component";
import { set } from "@ember/object";

export default Component.extend({
  roomIndex: null,
  selectedUser: null,
  users: null,
  init() {
    this._super(...arguments);
  },
  actions: {
    showChat(index) {
      set(this, "roomIndex", index);
      set(this, "selectedUser", index);
    }
  }
});
