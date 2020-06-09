const socket = io.connect("http://localhost:3005");
const chatBox = document.getElementById('chatbox')
const msgForm = document.getElementById('messageForm');
const msgInput = document.getElementById('msg');

const name = prompt('What is your name?');
appendMsg("You joined.");
socket.emit('new-user', name);

// append new msg
socket.on('chat-message', data => {
    appendMsg(data.name + ": " + data.msg, data.color, false);
}); 

// append new user msg
socket.on('user-connected', name => {
    appendMsg(name + " joined.", "", true);
})

// append disconnect user msg
socket.on('user-disconnected', name => {
    appendMsg(name + " left.", "", true);
})

// register send msg event
msgForm.addEventListener('submit', e => {
    e.preventDefault();
    const msg = msgInput.value;
    appendMsg("You: " + msg, "black", false);
    socket.emit('send-chat-message', msg);
    msgInput.value = ''; 
});

// add in msg manipulation here:

//NEXT QUEST: 
//- add in a simple en / decrypter which does it with a password!
//    - then let it send that encrypted msg
//- when this works decrypt before !
function appendMsg(msg, color, weight) {
    const msgE = document.createElement('div');
    if (color != "") { msgE.style.color = color; }
    if (weight != false) { msgE.style.fontWeight = 900; }
    msgE.innerText = msg;
    chatBox.append(msgE);
}
