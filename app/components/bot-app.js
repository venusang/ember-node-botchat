import Component from "@ember/component";
import axios from "npm:axios";
import Pusher from "npm:pusher-js";
// import { ChatManager, TokenProvider } from "@pusher/chatkit-client";

export default Component.extend({
  chats: null,
  appKey: "88bb13d1744ecc27c52f",
  init() {
    this._super(...arguments);
    this.set("chats", []);
    let pusher = new Pusher(this.appKey, {
      cluster: "us3",
      forceTLS: true
      // auth: {
      //   headers: {
      //     "Set-Cookie": "HttpOnly;Secure;SameSite=Strict"
      //   }
      // }
    });
    const channel = pusher.subscribe("bot");
    channel.bind("bot-response", data => {
      const response = {
        speech: data.speech,
        query: data.query
      };
      this.get("chats").pushObject(response);
    });

    //https://pusher.com/docs/chatkit/reference/javascript
    // const tokenProvider = new TokenProvider({
    //   url:
    //     "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/f6dbf701-0367-4880-9ea7-b7f0e8b5fb01/token"
    // });
    //
    // const chatManager = new ChatManager({
    //   instanceLocator: "v1:us1:f6dbf701-0367-4880-9ea7-b7f0e8b5fb01",
    //   userId: "recruiter",
    //   tokenProvider: tokenProvider
    // });
    //
    // chatManager
    //   .connect()
    //   .then(currentUser => {
    //     console.log("Successful connection", currentUser);
    //   })
    //   .catch(err => {
    //     console.log("Error on connection", err);
    //   });
  },
  actions: {
    sendChat() {
      const text = this.get("message");
      axios.post("http://localhost:3000/dialogue", { text });
      this.set("message", "");
    },
    newConnection() {
      let pusher = new Pusher(this.appKey, {
        cluster: "us3",
        forceTLS: true
      });
      pusher.connection.bind("connected", function() {
        document.getElementById("status").innerHTML = "Realtime is go!";
      });
    }
  }
});
