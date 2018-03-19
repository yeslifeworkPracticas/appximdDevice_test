var db = null;
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
                alert('la bbdd existe');
                mostrarDatos();
            } else {
                alert('la bbdd no existe');
                document.location.replace("registro.html");
            }
        }, function (tx, error) {
            //alert('la bbdd no existe');
            return;
        });
    });
}

function crearTabla() {
    db.transaction(function (tx) {
        tx.executeSql("create table device(fecha TEXT, so TEXT, nav TEXT, alias TEXT UNIQUE)", [], function (result) {});
    });
    alert('tabla creada');
}

function crearRegistro() {
    db.transaction(function (tx) {
        tx.executeSql("insert into device values(?,?,?,?) ", [document.querySelector("#fecha").value, document.querySelector("#so").value, document.querySelector("#nav").value, document.querySelector("#alias").value]);
        document.location.replace("index.html");
    });
    alert('Registro insertado');
}

function mostrarDatos() {
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM device", [], function (tx, result) {

            /*var schemanode = document.getElementById('schema');
             schemanode.innerHTML = "";*/

           // for (var i = 0; i < result.rows.length; ++i) {
                var row = result.rows.item(0);
                //alert("alias: "+row["alias"]);
                document.forms['login']['alias_device'].value = row["alias"]; 
                

                /*var notediv = document.createElement('div');
                 notediv.innerHTML = 'fecha: ' + row['fecha'] + ', so: ' + row['so'] + ', nav ' + row['navegador'] + ', alias ' + row['alias'];
                 schemanode.appendChild(notediv);*/
            }
        /*}*/, function (tx, error) {
            alert('Failed to retrieve notes from database - ' + error.message);
            return;
        });
    });
}
function borrarRegistro() {
    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM device WHERE alias = ?', [document.querySelector("#alias").value]);
    }, function () {
    }, function () {
    });
    alert('Registro borrado');
}
            