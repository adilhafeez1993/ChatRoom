//adding new chat documents
//setting real time listener to new chat documents
//updating username
//updating the room

class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chats");
    this.unsub;
  }
  async addChat(message) {
    // format a chat object
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };
    //save chat document
    const response = await this.chats.add(chat);
    return response;
  }
  getsChats(callback) {
    this.unsub = this.chats
      .where("room", "==", this.room) //complexQueries method used to get data whenever condition is true
      .orderBy("created_at") //it orders the data according to the timeStamp
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            //update ui
            callback(change.doc.data());
          }
        });
      });
  }
  updateName(username) {
    this.username = username;
    localStorage.setItem("username", username);
  }
  updateRoom(room) {
    this.room = room;
    console.log("room updated");
    if (this.unsub) {
      this.unsub();
    }
  }
}
