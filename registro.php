<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="msapplication-tap-highlight" content="no">
        <meta name="description" content="Materialize is a Material Design Admin Template,It's modern, responsive and based on Material Design by Google. ">
        <meta name="keywords" content="materialize, admin template, dashboard template, flat admin template, responsive admin template,">
        <title>Registrarse</title>
        <!--icons -->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <!-- Favicons-->
        <link rel="icon" href="images/favicon/YesLifeWork.jpg" sizes="32x32">
        <!-- Favicons-->
        <link rel="apple-touch-icon-precomposed" href="images/favicon/apple-touch-icon-152x152.png">
        <!-- For iPhone -->
        <meta name="msapplication-TileColor" content="#00bcd4">
        <meta name="msapplication-TileImage" content="images/favicon/mstile-144x144.png">
        <!-- For Windows Phone -->


        <!-- CORE CSS-->
        <link href="css/materialize.css" type="text/css" rel="stylesheet" media="screen">
        <link href="css/estilo-principal.css" type="text/css" rel="stylesheet" media="screen">
        <link href="css/centrar-pagina.css" type="text/css" rel="stylesheet" media="screen">
        <link href="css/register-style.css" type="text/css" rel="stylesheet" media="screen">
        <!-- scripts -->
        <script src="js/local_db.js" type="text/javascript"></script>
        <script src="js/datosLocales.js" type="text/javascript"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    </head>

    <body class="corporative-Orange" onload="datosLocales();">
        <div id="register-page" class="row">
            <div class="col s12 z-depth-4 card-panel">
                <form action="http://192.168.1.54/PhpProject1/index.php" method="post">
                    <div class="row">
                        <div class="input-field col s12 center">
                            <h4>REGISTRO DE DISPOSITIVO</h4>
                        </div>
                    </div>
                    <p id="error_register"></p>
                    <div class="row margin">
                        <div class="input-field col s12">
                            <i class="material-icons md-48 icon-format prefix">radio_button_checked</i>

                            <input name="fecha" id="fecha" type="text" required readonly>

                        </div>

                    </div>
                    <div class="row margin">
                        <div class="input-field col s12">
                            <i class="material-icons md-48 icon-format prefix">radio_button_checked</i>
                            <input  name="so" id="so" type="text" required readonly>

                        </div>
                    </div>
                    <div class="row margin">
                        <div class="input-field col s12">
                            <i class="material-icons md-48 icon-format prefix">radio_button_checked</i>
                            <input name="nav" id="nav" type="text" required readonly>


                        </div>
                    </div>
                    <div class="row margin">
                        <div class="input-field col s12">
                            <i class="material-icons md-48 icon-format prefix">arrow_forward</i>
                            <input name="alias" id="alias" type="text" required>
                            <label>Alias</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <div class="input-field col s12">
                                <button type="submit" onclick="open_registro();crearTabla();crearRegistro();" class="btn waves-effect waves-light col s12">REGISTRAR DISPOSITIVO</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- ================================================
          Scripts
          ================================================ -->

        <!-- jQuery Library -->
        <script type="text/javascript" src="js/jquery-1.11.2.min.js"></script>
        <!--materialize js-->
        <script type="text/javascript" src="js/materialize.js"></script>

        <!--plugins.js - Some Specific JS codes for Plugin Settings-->
        <script type="text/javascript" src="js/plugins.js"></script>
        <script language='javascript' type='text/javascript'>
                                    /* function check(input) {
                                     if (input.value != document.getElementById('password').value) {
                                     input.setCustomValidity('Las contraseñas no coinciden');
                                     } else {
                                     // input is valid -- reset the error message
                                     input.setCustomValidity('');
                                     }
                                     }*/
        </script>

        <script>
            /*function onLoad() {
             document.getElementById("error_register").innerHTML = "";
             var error_register;
             var error_register = getCookie("error_register");
             deleteCookie("error_register");
             
             if (typeof error_register == 'undefined') {
             error_register = "";
             } else {
             error_register = error_register.substring(1, error_register.length - 1);
             }
             
             document.getElementById("error_register").innerHTML = error_register;
             }
             
             function getCookie(name) {
             var value = "; " + document.cookie;
             var parts = value.split("; " + name + "=");
             if (parts.length == 2) {
             return parts.pop().split(";").shift();
             }
             }
             
             function deleteCookie(name) {
             document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
             }*/
        </script>
    </body>

</html>