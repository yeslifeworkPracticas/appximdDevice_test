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
@WebServlet("/a")
public class RegisterServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");

        String fecha = request.getParameter("fecha");
        String so = request.getParameter("so");
        String nav = request.getParameter("nav");
        String alias = request.getParameter("alias");

        Connection conn = null;
        ResultSet register = null;
        PreparedStatement myQuery = null;
        try {
            Class.forName("com.mysql.jdbc.Driver");
            DDBBConnection DDBB = new DDBBConnection();
            conn = DDBB.connnectDevices();

            String myQuerySearchStr = "SELECT * FROM ximddevice WHERE alias = ? ";
            myQuery = conn.prepareStatement(myQuerySearchStr);
            myQuery.setString(1, alias);
            register = myQuery.executeQuery();

            if (register.absolute(1)) {
                RequestDispatcher rd = request.getRequestDispatcher("registro.html");
                Cookie error = new Cookie("error_register", "Dispositivo ya registrado");
                response.addCookie(error);
                response.sendRedirect("registro.html");
                rd.include(request, response);
            } else {
                String myQueryInsertStr = "INSERT INTO ximddevice (alias, so, navegador, fecha) VALUES (?, ?, ?, ?)";
                myQuery = conn.prepareStatement(myQueryInsertStr);
                myQuery.setString(1, alias);
                myQuery.setString(2, so);
                myQuery.setString(3, nav);
                myQuery.setString(3, fecha);
                myQuery.executeUpdate();
                /*Cookie username = new Cookie("username", usuario);
                response.addCookie(username);*/
                response.sendRedirect("app.jsp");
            }
        } catch (Exception e) {
            e.printStackTrace();
            RequestDispatcher rd = request.getRequestDispatcher("registro.html");
            Cookie error = new Cookie("error_register", "Error de conexion a la Base de Datos");
            response.addCookie(error);
            response.sendRedirect("registro.html");
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
}
