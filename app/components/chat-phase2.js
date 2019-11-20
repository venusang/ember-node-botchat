import Component from "@ember/component";
import { get, set, computed } from "@ember/object";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";

export default Component.extend({
  chats: null,
  appKey: "88bb13d1744ecc27c52f",
  roomIndex: null,
  candidateRoom: null,
  messageList: computed("roomIndex", function() {
    let roomIndex = get(this, "roomIndex");
    return `message-list-${roomIndex}`;
  }),
  messageForm: computed("roomIndex", function() {
    let roomIndex = get(this, "roomIndex");
    return `message-form-${roomIndex}`;
  }),
  messageText: computed("roomIndex", function() {
    let roomIndex = get(this, "roomIndex");
    return `message-tex-${roomIndex}`;
  }),
  currentUser: null,
  init() {
    this._super(...arguments);

    //https://pusher.com/docs/chatkit/reference/javascript
    const tokenProvider = new TokenProvider({
      url:
        "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/f6dbf701-0367-4880-9ea7-b7f0e8b5fb01/token"
    });

    const chatManager = new ChatManager({
      instanceLocator: "v1:us1:f6dbf701-0367-4880-9ea7-b7f0e8b5fb01",
      userId: "recruiter",
      tokenProvider: tokenProvider
    });

    let roomIndex = get(this, "roomIndex");
    let messageList = get(this, "messageList");
    chatManager
      .connect()
      .then(currentUser => {
        set(this, "currentUser", currentUser);
        set(this, "candidateRoom", currentUser.rooms[roomIndex].name);
        currentUser.subscribeToRoomMultipart({
          roomId: currentUser.rooms[roomIndex].id,
          hooks: {
            onMessage: message => {
              const messageListDiv = document.getElementById(messageList);
              const messageItemDiv = document.createElement("div");
              if (message.senderId !== "recruiter") {
                messageItemDiv.className = "candidate";
              } else {
                messageItemDiv.className = message.senderId;
              }
              messageItemDiv.className = message.senderId;
              messageItemDiv.appendChild(
                document.createTextNode(`${message.parts[0].payload.content}`)
              );
              messageListDiv.appendChild(messageItemDiv);
            }
          }
        });
        let messageForm = get(this, "messageForm");
        let messageText = get(this, "messageText");
        const form = document.getElementById(messageForm);
        form.addEventListener("submit", e => {
          e.preventDefault();
          const input = document.getElementById(messageText);
          currentUser.sendSimpleMessage({
            text: input.value,
            roomId: currentUser.rooms[roomIndex].id
          });
          input.value = "";
        });
      })
      .catch(error => {
        /* eslint-disable */

        console.error("error:", error);
      });
  }
});
