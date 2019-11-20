import Component from "@ember/component";
import axios from "npm:axios";
import Pusher from "npm:pusher-js";

export default Component.extend({
  classNames: ["chat-phase1"],
  chats: null,
  appKey: "88bb13d1744ecc27c52f",
  init() {
    this._super(...arguments);
    this.set("chats", []);
    let pusher = new Pusher(this.appKey, {
      cluster: "us3",
      forceTLS: true
    });
    const channel = pusher.subscribe("bot");
    channel.bind("bot-response", data => {
      const response = {
        speech: data.speech,
        query: data.query
      };
      this.get("chats").pushObject(response);
    });
  },
  actions: {
    sendChat() {
      const text = this.get("message");
      axios.post("http://localhost:3000/dialogue", { text });
      this.set("message", "");
    }
  }
});
