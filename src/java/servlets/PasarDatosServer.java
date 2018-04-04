/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import java.io.IOException;
import java.io.PrintWriter;
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
 * @author user
 */
@WebServlet("/RegisterDevice")
public class PasarDatosServer extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
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

            String myQueryInsertStr = "INSERT INTO devices (id,alias,so,type,navegador,Fecha,user) VALUES (?, ?, ?, ?, ?, ?, ?)";
            myQuery = conn.prepareStatement(myQueryInsertStr);
            myQuery.setInt(1, 20);
            myQuery.setString(2, alias);
            myQuery.setString(3, so);
            myQuery.setString(4, "tipo");
            myQuery.setString(5, nav);
            myQuery.setString(6, fecha);
            myQuery.setString(7, "e@ylw.com");
            myQuery.executeUpdate();
            //response.sendRedirect("index.jsp");

        } catch (Exception e) {
            /*e.printStackTrace();
            RequestDispatcher rd = request.getRequestDispatcher("registro.html");
            Cookie error = new Cookie("error_register", "Error de conexion a la Base de Datos");
            response.addCookie(error);
            response.sendRedirect("registro.html");
            rd.include(request, response);*/
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

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
