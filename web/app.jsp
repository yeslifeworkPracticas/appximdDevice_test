<%@page import="java.sql.*"%>
<%@page import="servlets.*"%>
<%@page import="java.io.*" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    Class.forName("com.mysql.jdbc.Driver");
    DDBBConnection conn = new DDBBConnection();
    Connection server;
    server = conn.connnectDatos();
    Statement stmt = null;
    stmt = server.createStatement();
    String username = "";
    Cookie[] cookies = request.getCookies();
    if (cookies != null) {
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("username")) {
                username = cookie.getValue();
            }
        }
    }
    String sql = "SELECT * FROM archivos WHERE tipo ='pl'"
            + "UNION"
            + " SELECT * FROM archivos WHERE autor = '"+username+"'";
    ResultSet rs = stmt.executeQuery(sql);
%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="msapplication-tap-highlight" content="no">
        <meta name="description" content="Materialize is a Material Design Admin Template,It's modern, responsive and based on Material Design by Google. ">
        <meta name="keywords" content="materialize, admin template, dashboard template, flat admin template, responsive admin template,">
        <title>YesLifeWork</title>

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
        <link href="css/app.css" type="text/css" rel="stylesheet" media="screen">
        <link href="css/modificar-tabla.css" type="text/css" rel="stylesheet" media="screen">


        <!-- INCLUDED PLUGIN CSS ON THIS PAGE -->
        <link href="js/plugins/data-tables/css/jquery.dataTables.min.css" type="text/css" rel="stylesheet" media="screen">
        <!--Meta de OAuth2 de Google-->
        <meta name="google-signin-client_id" content="145010941043-cvkmq57isnuc949t2q96v80q81tvj0si.apps.googleusercontent.com">
    </head>

    <body>
        <!-- START HEADER -->
        <header id="header" class="page-topbar">
            <!-- start header nav-->
            <div class="navbar-fixed">
                <nav>
                    <div class="nav-wrapper">
                        <a href="app.html" class="brand-logo darken-1"><img id="logo-foto" src="images/YesLifeWork.jpg" alt="yeslifework logo"></a>
                        <ul class="right hide-on-med-and-down">
                            <li class="search-out">
                                <input type="text" class="search-out-text">
                            </li>
                            <li>    
                                <a href="javascript:void(0);" class="waves-effect waves-block waves-light show-search"><i class="mdi-action-search top-icons"></i></a>                              
                            </li>
                            <li><a href="javascript:void(0);" class="waves-effect waves-block waves-light toggle-fullscreen"><i class="mdi-action-settings-overscan top-icons"></i></a>
                            </li>
                            <li><a href="javascript:void(0);" class="waves-effect waves-block waves-light"><i class="mdi-social-notifications top-icons"></i></a>
                            </li>
                            <!-- Dropdown Trigger -->                        
                            <li><a href="#" data-activates="chat-out" class="waves-effect waves-block waves-light chat-collapse"><i class="mdi-communication-chat top-icons"></i></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <!-- end header nav-->
        </header>
        <!-- END HEADER -->

        <!-- //////////////////////////////////////////////////////////////////////////// -->

        <!-- START MAIN -->
        <div id="main">
            <!-- START WRAPPER -->
            <div class="wrapper">

                <!-- START LEFT SIDEBAR NAV-->
                <aside id="left-sidebar-nav">
                    <ul id="slide-out" class="side-nav fixed leftside-navigation">
                        <li class="user-details color-usuario darken-2">
                            <div class="row">
                                <div class="col col s4 m4 l4">
                                    <img src="" alt="" class="circle responsive-img valign profile-image">
                                </div>
                                <div class="col col s8 m8 l8">
                                    <ul id="profile-dropdown" class="dropdown-content">
                                        <!--<li><a href="#"><i class="mdi-action-face-unlock"></i>Perfil</a>
                                        </li>
                                        <li><a href="#"><i class="mdi-action-settings"></i>Ajustes</a>
                                        </li>
                                        <li><a href="#"><i class="mdi-communication-live-help"></i>Ayuda</a>
                                        </li>
                                        <li class="divider"></li>
                                        <li><a href="#"><i class="mdi-action-lock-outline"></i>Bloqueo</a>
                                        </li>-->
                                        <li><a href="index1.html" onclick="signOut()"><i class="mdi-hardware-keyboard-tab"></i>Salir</a>
                                        </li>
                                    </ul>
                                    <a class="btn-flat dropdown-button waves-effect waves-light white-text profile-btn" href="#" id="username" data-activates="profile-dropdown">Usuario<i class="mdi-navigation-arrow-drop-down right"></i></a>
                                    <p class="user-roal">Administrador</p>
                                </div>
                            </div>
                        </li>
                        <li class="bold"><a href="#" class="waves-effect waves-cyan"><i class="mdi-action-dashboard"></i>Menú 1</a>
                        </li>
                        <li class="bold"><a href="#" class="waves-effect waves-cyan"><i class="mdi-action-dashboard"></i>Menú 2</a>
                        </li>
                        <li class="bold"><a href="#" class="waves-effect waves-cyan"><i class="mdi-action-dashboard"></i>Menú 3</a>
                        </li>
                        <li class="no-padding">
                            <ul class="collapsible collapsible-accordion">
                                <li class="bold"><a class="collapsible-header waves-effect waves-cyan"><i class="mdi-action-dashboard"></i>Menú 4</a>
                                    <div class="collapsible-body">
                                        <ul>
                                            <li><a href="#">Menú 4.1</a>
                                            </li>                                        
                                            <li><a href="#">Menú 4.2</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="bold"><a class="collapsible-header  waves-effect waves-cyan"><i class="mdi-action-dashboard"></i>Menú 5</a>
                                    <div class="collapsible-body">
                                        <ul>
                                            <li><a href="#">Menú 5.1</a>
                                            </li>
                                            <li><a href="#">Menú 5.2</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                            </ul>
                        </li>
                    </ul>
                    <a href="#" data-activates="slide-out" class="sidebar-collapse btn-floating btn-medium waves-effect waves-light hide-on-large-only darken-2"><i class="mdi-navigation-menu"></i></a>
                </aside>
                <!-- END LEFT SIDEBAR NAV-->

                <!-- //////////////////////////////////////////////////////////////////////////// -->

                <!-- START CONTENT -->
                <section id="content">
                    <!--start container-->
                    <div class="container">
                        <div class="section">
                            <div class="col s12 m8 l9">
                                <table id="data-table-simple" class="striped centered tabla-modificar">
                                    <thead>
                                        <tr>
                                            <th data-field="name">Autor</th>
                                            <th data-field="docType">DocType</th>
                                            <th data-field="theme">Tema</th>
                                            <th data-field="date">Fecha</th>
                                            <th data-field="upLink">Archivo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <%
                                            while (rs.next()) {
                                        %>
                                        <tr>
                                            <td><%=rs.getString(4)%></td>
                                            <td><%=rs.getString(6)%></td>
                                            <td><%=rs.getString(5)%></td>
                                            <td><%=rs.getString(7)%></td>
                                            <td><%=rs.getString(3)%></td>
                                        </tr> 
                                        <%
                                            }
                                        %>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- END CONTENT -->


                <!-- LEFT RIGHT SIDEBAR NAV-->

            </div>
            <!-- END WRAPPER -->

        </div>
        <!-- END MAIN -->



        <!-- //////////////////////////////////////////////////////////////////////////// -->

        <!-- START FOOTER -->
        <footer class="page-footer">
            <div class="footer-copyright">
                <div class="container">
                    <span>Copyright © 2018 YesLifeWork. All rights reserved.</span>
                </div>
            </div>
        </footer>
        <!-- END FOOTER -->



        <!-- ================================================
        Scripts
        ================================================ -->

        <!-- jQuery Library -->
        <script type="text/javascript" src="js/jquery-1.11.2.min.js"></script>    
        <!--materialize js-->
        <script type="text/javascript" src="js/materialize.js"></script>
        <!--data-tables-->
        <script type="text/javascript" src="js/plugins/data-tables/js/jquery.dataTables.min.js"></script>
        <script type="text/javascript" src="js/plugins/data-tables/data-tables-script.js"></script>
        <!--scroll and full screen-->
        <!--<script type="text/javascript" src="js/plugins/perfect-scrollbar/perfect-scrollbar.min.js"></script>-->        
        <!--plugins.js - Some Specific JS codes for Plugin Settings-->
        <script type="text/javascript" src="js/plugins.js"></script>
        <!--Script logout-->
        <script>
                                            function signOut() {
                                                var auth2 = gapi.auth2.getAuthInstance();
                                                auth2.signOut().then(function () {
                                                    deleteCookie("username");
                                                    console.log('User signed out.');
                                                });
                                            }
                                            function onLoad() {
                                                gapi.load('auth2', function () {
                                                    gapi.auth2.init();
                                                    var username = getCookie("username");
                                                    document.getElementById("username").innerHTML = username;
                                                });
                                            }
                                            function getCookie(name) {
                                                var value = "; " + document.cookie;
                                                var parts = value.split("; " + name + "=");
                                                if (parts.length == 2)
                                                    return parts.pop().split(";").shift();
                                            }
                                            function deleteCookie(name) {
                                                document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                                            }
        </script>
        <script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>
    </body>

</html>
