var value;
var db = null;


//var ws = new WebSocket("ws://192.162.1.53:8084/Server/WebSocketServer");
/*var ws = new WebSocket("ws://192.162.1.38:8084/WebSocketChat/wschat");
 
 ws.onopen = function () {
 alert("Hey estoy conectado");
 };
 
 ws.onmessage = function (message) {
 alert(message);
 open_registro();
 crearTabla();
 
 var id;
 var fecha;
 var so;
 var nav;
 var alias;
 
 crearRegistro(id, fecha, so, nav, alias);
 };*/

//Comprobar si BBDD Local existe o no y redireccionar al registro


function enviar() {
    var fecha = document.getElementById("fecha").value;
    var so = document.getElementById("so").value;
    var nav = document.getElementById("nav").value;
    var alias = document.getElementById("alias").value;
    var todo = "fecha: " + fecha + ", so: " + so + ", nav: " + nav + ", alias: " + alias;
    $.post("PasarDatosServer.java", {suggest: todo}, function (result) {
        alert('enviado');
    });
}

function LoadDB() {
    db = openDatabase("BD", "1.0", "HTML5 SQLITE Example", 200000);

    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM sqlite_master WHERE name ='device' and type='table'", [], function (tx, result) {

            if (result.rows.length > 0) {
                alert('Dispositivo registrado');
                mostrarDatos();
            } else {
                alert('Dispositivo no registrado. Redireccionando al registro');
                document.location.replace("registro.php");
            }
        }, function (tx, error) {
            alert('Error');
            return;
        });
    });
}

//Crear BBDD Local
function open_registro() {
    db = openDatabase("BD", "1.0", "HTML5 SQLITE Example", 200000);
}

//Crear Tabla
function crearTabla() {
    db.transaction(function (tx) {
        tx.executeSql("create table device(fecha TEXT, so TEXT, nav TEXT, alias TEXT UNIQUE)", [], function (result) {});
    });
}

//Realizar insert del dispositivo
function crearRegistro(/*id, fecha, so, nav, alias*/) {
    db.transaction(function (tx) {
        tx.executeSql("insert into device values(?,?,?,?) ", /*[id, fecha, so, nav, alias]*/
                [document.querySelector("#fecha").value, document.querySelector("#so").value, document.querySelector("#nav").value, document.querySelector("#alias").value]
                );
        document.location.replace("index.php");
    });
    //ws.close();
}

//Crear WebSocket y llamar al método crearRegistro pasándole los datos recibidos del server

//Enviar los datos al server
/*function postToServer() {
 
 var fecha = document.getElementById("fecha").value;
 var so = document.getElementById("so").value;
 var nav = document.getElementById("nav").value;
 var alias = document.getElementById("alias").value;
 var todo = "fecha: " + fecha + ", so: " + so + ", nav: " + nav + ", alias: " + alias;
 
 ws.send(todo);
 }
 
 //Cerrar conexión
 function closeConnect() {
 ws.close();
 }*/

//Mostrar Datos
function mostrarDatos() {
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM device", [], function (tx, result) {

            var row = result.rows.item(0);
            document.forms['login']['alias_device'].value = row["alias"];



            fecha_lista = row["fecha"];
            so_lista = row["so"];
            nav_lista = row["nav"];

            document.getElementById("fecha_device").value = fecha_lista;
            document.getElementById("so_device").value = so_lista;
            document.getElementById("navegador_device").value = nav_lista;

        }
        , function (tx, error) {
            return;
        });
    });
}

