/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author User
 */
@WebServlet("/Login")
public class LoginServlet extends HttpServlet {

    public static final Pattern VALID_EMAIL_ADDRESS_REGEX
            = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTFs-8");

        String usuario_email = request.getParameter("username_or_email");
        String usuario = null;
        String email = null;
        String password = request.getParameter("password");

        if (validateEmail(usuario_email)) {
            email = usuario_email;
        } else {
            usuario = usuario_email;
        }

        Connection conn = null;
        ResultSet register = null;
        PreparedStatement myQuery = null;
        try {
            Class.forName("com.mysql.jdbc.Driver");
            DDBBConnection DDBB = new DDBBConnection();
            conn = DDBB.connnectDatos();

            if (usuario != null) {
                String myQueryStr = "SELECT * FROM users WHERE user = ? AND pass = ?";

                myQuery = conn.prepareStatement(myQueryStr);
                myQuery.setString(1, usuario);
                myQuery.setString(2, password);
            }
            if (email != null) {
                String myQueryStr = "SELECT * FROM users WHERE e-mail = ? AND pass = ?";

                myQuery = conn.prepareStatement(myQueryStr);
                myQuery.setString(1, email);
                myQuery.setString(2, password);
            }
            register = myQuery.executeQuery();

            if (register.absolute(1)) {
                String username_name = register.getNString(3);
                Cookie username = new Cookie("username", username_name);
                response.addCookie(username);
                response.sendRedirect("app.jsp");
            } else {
                RequestDispatcher rd = request.getRequestDispatcher("index.html");
                Cookie error = new Cookie("error_login", "Acceso denegado - Nombre de usuario o contrasena incorrectos");
                response.addCookie(error);
                response.sendRedirect("index.html");
                rd.include(request, response);
            }
        } catch (Exception e) {
            e.printStackTrace();
            RequestDispatcher rd = request.getRequestDispatcher("index.html");
            Cookie error = new Cookie("error_login", "Error de conexion a la Base de Datos");
            response.addCookie(error);
            response.sendRedirect("index.html");
            rd.include(request, response);
        } finally {
            try {
                // Close the result sets and statements,
                // and the connection is returned to the pool
                if (register != null) {
                    register.close();
                    register = null;
                }
                if (myQuery != null) {
                    myQuery.close();
                    myQuery = null;
                }
                if (conn != null) {
                    conn.close();
                    conn = null;
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    public static boolean validateEmail(String emailStr) {
        Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(emailStr);
        return matcher.find();
    }

}