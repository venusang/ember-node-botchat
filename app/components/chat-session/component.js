import Component from "@ember/component";
import { get, set, computed } from "@ember/object";
import { inject as service } from "@ember/service";

export default Component.extend({
  pusher: service(),
  roomName: null,
  room: null,
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
    return `message-text-${roomIndex}`;
  }),
  currentUser: null,
  currentUserRooms: null,
  chatManager: null,
  loadChatSession() {
    let roomIndex = get(this, "roomIndex");
    if (!roomIndex) {
      roomIndex = 0;
    }
    let messageList = get(this, "messageList");
    const chatManager = this.pusher.createChatManager();
    set(this, "chatManager", chatManager);
    chatManager
      .connect()
      .then(currentUser => {
        set(this, "currentUser", currentUser);
        set(this, "currentUserRooms", currentUser.rooms);
        set(this, "roomName", currentUser.rooms[roomIndex].name);
        set(this, "room", currentUser.rooms[roomIndex]);
        const chatMessages = document.getElementById(messageList);
        chatMessages.innerHTML = "";
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
  },
  // createUser() {
  //   let chatManager = get(this, "chatManager");
  //   currentUser
  //     .createRoom({
  //       id: currentUser.rooms[4].id,
  //       name: "Candidate 5",
  //       private: false,
  //       addUserIds: ["candidate5", "recruiter"],
  //       customData: { foo: 42 }
  //     })
  //     .then(room => {
  //       console.log(`Created room called ${room.name}`);
  //     })
  //     .catch(err => {
  //       console.log(`Error creating room ${err}`);
  //     });
  // },
  didUpdateAttrs() {
    console.log("didUpdateAttrs");
    this.loadChatSession();
  },
  init() {
    this._super(...arguments);
    this.loadChatSession();
  }
});