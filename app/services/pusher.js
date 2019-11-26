import Service from "@ember/service";
import { set, get } from "@ember/object";
import Pusher from "npm:pusher-js";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
import ENV from "../config/environment";

export default Service.extend({
  pusher: null,
  chats: null,
  userName: null,
  rooms: null,
  appKey: ENV.APP.PUSHER_APP_KEY,
  tokenProviderUrl: ENV.APP.PUSHER_TOKEN_PROVIDER_URL,
  connectToChannel() {
    //this is for channels
    return new Pusher(this.appKey, {
      cluster: "us3",
      forceTLS: true
    });
  },
  createTokenProvider() {
    //this is needed for chatkit
    const tokenProvider = new TokenProvider({
      url: get(this, "tokenProvider")
    });
    set(this, "tokenProvider", tokenProvider);
  },
  subscribeToChannel() {
    const pusher = this.connectToChannel();
    return pusher.subscribe("bot");
  },
  async createChatManager() {
    await this.createTokenProvider();
    return new ChatManager({
      instanceLocator: ENV.APP.PUSHER_INSTANCE_LOCATOR,
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
