const socket = io("http://localhost:3000");
const message = document.getElementById("message");
const messages = document.getElementById("messages");

const hanldeSubmitNewMessage = () => {
   console.log(socket.emit('message', { data: message.value }));
  socket.emit('message', { data: message.value });
};

socket.on('message', ({ data }) => {
  console.log("message", data);
  hanldeNewMessage(data);
});

const hanldeNewMessage = (message) => {
  messages.appendChild(buildNewMessage(message));
};

const buildNewMessage = (message) => {
  console.log("buildNewMessage", message);
  const li = document.createElement("li");
  return li.appendChild(document.createTextNode(message));
};
