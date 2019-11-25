import Service from "@ember/service";
import { set, get } from "@ember/object";
import Pusher from "npm:pusher-js";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";

export default Service.extend({
  appKey: "88bb13d1744ecc27c52f",
  pusher: null,
  chats: null,
  userName: null,
  rooms: null,
  tokenProviderUrl:
    "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/f6dbf701-0367-4880-9ea7-b7f0e8b5fb01/token",
  createPusherObject() {
    set(
      this,
      "pusher",
      new Pusher(this.appKey, {
        cluster: "us3",
        forceTLS: true
      })
    );
  },
  createPusherChannel() {
    get(this, "pusher")
      .subscribe("bot")
      .bind("bot-response", data => {
        const response = {
          speech: data.speech,
          query: data.query
        };
        this.get("chats").pushObject(response);
      });
  },
  createTokenProvider() {
    //this is needed for chatkit
    const tokenProvider = new TokenProvider({
      url: get(this, "tokenProvider")
    });
    set(this, "tokenProvider", tokenProvider);
  },
  async createChatManager() {
    await this.createTokenProvider();
    return new ChatManager({
      instanceLocator: "v1:us1:f6dbf701-0367-4880-9ea7-b7f0e8b5fb01",
      userId: "recruiter",
      tokenProvider: get(this, "tokenProviderUrl")
    });
  },
  async loadUserRooms() {
    let chatManager = await this.createChatManager();

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
