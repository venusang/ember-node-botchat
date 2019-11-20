import Component from "@ember/component";
import { set } from "@ember/object";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";

export default Component.extend({
  selectedUser: null,
  userName: null,
  rooms: null,
  async loadUserRooms() {
    const tokenProvider = new TokenProvider({
      url:
        "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/f6dbf701-0367-4880-9ea7-b7f0e8b5fb01/token"
    });

    const chatManager = new ChatManager({
      instanceLocator: "v1:us1:f6dbf701-0367-4880-9ea7-b7f0e8b5fb01",
      userId: "recruiter",
      tokenProvider: tokenProvider
    });

    await chatManager
      .connect()
      .then(currentUser => {
        set(this, "rooms", currentUser.rooms);
      })
      .catch(error => {
        /* eslint-disable */
        console.error("error:", error);
      });
  },
  init() {
    this._super(...arguments);
  },
  didInsertElement() {
    this.loadUserRooms();
  }
});
