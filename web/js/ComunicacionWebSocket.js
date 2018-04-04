function conexion() {
    alert('conectado');
    ws = new WebSocket("ws://192.162.1.53/");
    alert(ws);
    ws.onopen = function () {
    };
    ws.onmessage = function (message) {
        document.getElementById("chatlog").textContent += message.data + "\n";
        document.body.style.backgroundColor = message.data;
    };
    return ws;
}

function postToServer() {
    alert('postSERVER' + ws);

    ws.send(document.getElementById("msg").value);
    document.getElementById("msg").value = "";
}
function closeConnect() {
    ws.close();
}