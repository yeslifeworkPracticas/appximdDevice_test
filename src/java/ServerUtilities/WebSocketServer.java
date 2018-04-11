//This sample is how to use websocket of Tomcat7.0.52.
//web.xml is not required. Because you can use Servlet3.0 Annotation.
package ServerUtilities;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/WebSocketServer")
public class WebSocketServer {

    //notice:not thread-safe
    private static ArrayList<Session> sessionList = new ArrayList<Session>();
    private String userName = "";

    @OnOpen
    public void onOpen(Session session) {
        try {
            sessionList.add(session);
            userName = session.getId();
            System.out.println(userName);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @OnClose
    public void onClose(Session session) {
        sessionList.remove(session);
    }

    @OnMessage
    public void onMessage(String msg) throws ClassNotFoundException, SQLException, IOException {
        String message = msg;

        String fecha = "";
        String SO = "";
        String nav = "";
        String alias = "";
        if (message.startsWith("fecha: ")) {
            String[] msgDivided_1 = message.split("fecha: ", 2);
            String[] msgDivided_2 = msgDivided_1[1].split(", so: ", 2);
            String[] msgDivided_3 = msgDivided_2[1].split(", nav: ", 2);
            String[] msgDivided_4 = msgDivided_3[1].split(", alias: ", 2);

            int ID = 0;
            fecha = msgDivided_2[0];
            SO = msgDivided_3[0];
            nav = msgDivided_4[0];
            alias = msgDivided_4[1];

            Connection conn = null;
            ResultSet register = null;
            PreparedStatement myQuery = null;
            try {
                Class.forName("com.mysql.jdbc.Driver");
                DDBBConnection DDBB = new DDBBConnection();
                conn = DDBB.connnectDevices();

                String myQuerySearchStr = "SELECT * FROM devices WHERE alias = ? AND so = ? AND navegador = ? AND fecha = ?";
                myQuery = conn.prepareStatement(myQuerySearchStr);
                myQuery.setString(1, fecha);
                myQuery.setString(2, SO);
                myQuery.setString(2, nav);
                myQuery.setString(2, alias);
                register = myQuery.executeQuery();

                if (register.absolute(1)) {
                    ID = register.getInt("id");
                    message = "resultado: " + "Login with Device " + alias + ", id: " + ID + ", fecha: " + fecha + ", so: " + SO + ", nav: " + nav + ", alias: " + alias;
                } else {
                    myQuerySearchStr = "SELECT * FROM devices";
                    myQuery = conn.prepareStatement(myQuerySearchStr);
                    register = myQuery.executeQuery();

                    register.last();
                    ID = register.getInt("id");
                    ID++;

                    String myQueryInsertStr = "INSERT INTO devices (id,alias,so,navegador,fecha) VALUES (?, ?, ?, ?, ?)";
                    myQuery = conn.prepareStatement(myQueryInsertStr);
                    myQuery.setInt(1, ID);
                    myQuery.setString(2, alias);
                    myQuery.setString(3, SO);
                    myQuery.setString(4, nav);
                    myQuery.setString(5, fecha);
                    myQuery.executeUpdate();

                    message = "resultado: " + "New Device registered" + ", id: " + ID + ", fecha: " + fecha + ", so: " + SO + ", nav: " + nav + ", alias: " + alias;
                }

            } catch (ClassNotFoundException | SQLException e) {
                message = "resultado: " + "ERROR...Cannot register/login" + ", id: " + ID + ", fecha: " + fecha + ", so: " + SO + ", nav: " + nav + ", alias: " + alias;
                e.getStackTrace(); 
            } finally {
                System.out.println(message);
                for (Session session : sessionList) {
                    if (userName.equals(session.getId())) {
                        session.getBasicRemote().sendText(message);
                    }
                }
            }
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
        } else {
            for (Session session : sessionList) {
                if (userName.equals(session.getId())) {
                    System.out.println(message);
                    session.getBasicRemote().sendText(message);
                } else {
                    session.getBasicRemote().sendText(userName + ": " + message);
                }
            }
        }
    }
}

/*
1-Recibir los datos de cliente para loguin
2-verificar datos en mysql y si no existen, registrar
3-
*/