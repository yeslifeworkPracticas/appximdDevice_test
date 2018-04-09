//var ws = new WebSocket("ws://192.168.1.53:8084/WebSocketChat/wschat");
var ws = new WebSocket("ws://192.168.1.53:8084/Server/WebSocketServer");

ws.onopen = function () {

};
ws.onmessage = function (msg) {
    var message = msg.data;
    alert(message);
    document.getElementById("chatlog").textContent += message + "\n";
};

function postToServer() {
    var userMessage = document.getElementById("msg").value;
    var listUser = document.getElementById("userList").value;
    
    document.getElementById("msg").value = "";
    
    var SendMessage = "fecha: " + "2018-03-10" + ", so: " + "Windows 10" + ", nav: " + "chrome" + ", alias: " + userMessage;
    ws.send(SendMessage);
    
}

function closeConnect() {
    ws.close();
}