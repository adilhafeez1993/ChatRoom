//dom queries
const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMssg = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms");

//add a new chat
newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => newChatForm.reset())
    .catch((err) => console.log(err));
});

//update username
newNameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //update name via chatroom
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  //reset the form
  newNameForm.reset();
  //show and hide the update message for name
  updateMssg.innerText = `Your name was updated to ${newName}`;
  setTimeout(() => (updateMssg.innerText = ""), 3000);
});

//update chat room
rooms.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute("id"));
    chatroom.getsChats((chat) => chatUI.render(chat));
  }
});

//check local Storage for name
const username = localStorage.username ? localStorage.username : "anon";

//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("general", username);

//gets chat and render
chatroom.getsChats((data) => chatUI.render(data));
