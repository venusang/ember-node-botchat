import Component from "@ember/component";
import axios from "axios";
import { inject as service } from "@ember/service";

export default Component.extend({
  classNames: ["chat-bot"],
  chats: null,
  pusher: service(),
  init() {
    this._super(...arguments);
    this.set("chats", []);

    let channel = this.pusher.subscribeToChannel();
    channel.bind("bot-response", data => {
      const response = {
        speech: data.speech,
        query: data.query
      };
      this.get("chats").pushObject(response);
    });

    // document.cookie = "same-site-cookie=foo; SameSite=None; Secure";
    // document.cookie = "cross-site-cookie=bar; SameSite=None; Secure";
    //setcookie('cross-site-cookie', 'name', ['samesite' => 'None', 'secure' => true]);
    /* eslint-disable */
    // console.log("document.cookie", document.cookie);
  },
  actions: {
    sendChat() {
      const text = this.get("message");
      axios.post("http://localhost:3000/dialogue", { text });
      this.set("message", "");
    }
  }
});
