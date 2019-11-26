import Service from "@ember/service";
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
  instanceLocator: ENV.APP.PUSHER_INSTANCE_LOCATOR,
  userId: "recruiter",
  connectToChannel() {
    //this is for channels
    return new Pusher(this.appKey, {
      cluster: "us3",
      forceTLS: true
    });
  },
  subscribeToChannel() {
    const pusher = this.connectToChannel();
    return pusher.subscribe("bot");
  },
  createTokenProvider() {
    //this is needed for chatkit
    return new TokenProvider({
      url: this.tokenProviderUrl
    });
  },
  createChatManager() {
    let tokenProvider = this.createTokenProvider();
    return new ChatManager({
      instanceLocator: this.instanceLocator,
      userId: this.userId,
      tokenProvider: tokenProvider
    });
  }
});
