/* global value */
var value;
var db = null;
var ws;
function open_registro() {
    db = openDatabase("BD", "1.0", "HTML5 SQLITE Example", 200000);

    /*db.transaction(function (tx) {
     tx.executeSql("SELECT * FROM sqlite_master WHERE name ='device' and type='table'", [], function (tx, result) {
     
     /*if (result.rows.length > 0) {
     alert('la bbdd existe');
     } else {
     alert('la bbdd no existe');
     window.
     window.open("registro.html");
     }
     }, function (tx, error) {
     alert('la bbdd no existe');
     return;
     });
     });*/
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
                document.location.replace("registro.html");
            }
        }, function (tx, error) {
            alert('Error');
            return;
        });
    });
}

function crearTabla() {
    db.transaction(function (tx) {
        tx.executeSql("create table device(id TEXT, fecha TEXT, so TEXT, nav TEXT, alias TEXT UNIQUE)", [], function (result) {});
    });
    //alert('tabla creada');
}

function crearRegistro(id, fecha, so, nav, alias) {
    db.transaction(function (tx) {
        tx.executeSql("insert into device values(?,?,?,?,?) ", [id, fecha, so, nav, alias]
                /*[document.querySelector("#fecha").value, document.querySelector("#so").value, document.querySelector("#nav").value, document.querySelector("#alias").value]*/
                );
        document.location.replace("index.html");
    });
    //alert('Registro insertado');
}

function mostrarDatos() {
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM device", [], function (tx, result) {

            //var schemanode = document.getElementById('schema');
            //schemanode.innerHTML = "";

            // for (var i = 0; i < result.rows.length; ++i) {
            var row = result.rows.item(0);
            //alert("alias: "+row["alias"]);
            document.forms['login']['alias_device'].value = row["alias"];
            //var select = document.getElementById(seleccionar)
            // var fecha_lista, so_lista, nav_lista;


            fecha_lista = row["fecha"];
            so_lista = row["so"];
            nav_lista = row["nav"];

            document.getElementById("fecha_device").value = fecha_lista;
            document.getElementById("so_device").value = so_lista;
            document.getElementById("navegador_device").value = nav_lista;


            /*var array = [fecha_lista, so_lista, nav_lista];
             cargarDatos("seleccionar", array);*/

            /*var select = document.getElementsByName("seleccionar");
             for (value in array) {
             var option = document.createElement("option");
             option.text = fecha_lista;
             select.add(option);
             var option2 = document.createElement("option");
             option.text = so_lista;
             select.add(option2);
             var option3 = document.createElement("option");
             option.text = nav_lista;
             select.add(option3);
             }*/

            /*document.forms['login']['fecha'].value = row["fecha"];
             document.forms['login']['so'].value = row["so"];
             document.forms['login']['navegador'].value = row["nav"];*/

            //var notediv = document.createElement('select');
            //notediv.innerHTML = 'fecha: ' + row['fecha'] + ', so: ' + row['so'] + ', nav ' + row['navegador'] + ', alias ' + row['alias'];
            //schemanode.appendChild(notediv);
        }
        /*}*/, function (tx, error) {
            //alert('Failed to retrieve notes from database - ' + error.message);
            return;
        });
    });
}
/*
 function cargarDatos(domElement, array) {
 
 var select = document.getElementsByName(domElement)[0];
 for (value in array) {
 var option = document.createElement("option");
 option.value= value;
 option.text = array[value];
 select.add(option);
 }
 }*/

function conexion() {
    ws = new WebSocket("ws://192.162.1.53:8084/WebSocketChat/wschat");

    ws.onopen = function () {
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
    };
    return ws;
}

function postToServer() {

    var fecha = document.getElementById("fecha").value;
    var so = document.getElementById("so").value;
    var nav = document.getElementById("nav").value;
    var alias = document.getElementById("alias").value;
    var todo = "fecha: " + fecha + ", so: " + so + ", nav: " + nav + ", alias: " + alias;

    ws.send(todo);
}
function closeConnect() {
    ws.close();
}

