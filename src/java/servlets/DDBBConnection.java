package servlets;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author user
 */
public class DDBBConnection {
    
    public Connection connnectDatos() throws SQLException{
        String DB_URL = "jdbc:mysql://192.168.1.53:3306/bd_data";
        String DB_USER = "user";
        String DB_PASSWD = "user";
        return DriverManager.getConnection(DB_URL,DB_USER,DB_PASSWD);
 
    }
    public Connection connnectDevices() throws SQLException{
        String DB_URL = "jdbc:mysql://192.168.1.53:3306/ximddevices";
        String DB_USER = "user";
        String DB_PASSWD = "user";
        return DriverManager.getConnection(DB_URL,DB_USER,DB_PASSWD);
        
    }
}
