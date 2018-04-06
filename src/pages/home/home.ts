import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  socket: any;
  clientAnswer: string;
  ws: any;
  mensaje : string;

  constructor(public navCtrl: NavController) {
    this.mensaje = "Algo";
    this.ws = new WebSocket("ws://192.168.1.53:8443/Server/WebSocketServer");
    this.ws.onopen = function () {

    };
    this.ws.onmessage = function (msg) {
        var message = msg.data;
        alert(message);
        this.mensaje = message;
    };
  }

  answerWebSocketServer(msg) {
    this.clientAnswer = "clientAnswer: " + msg;
    this.ws.send(this.clientAnswer);
    this.clientAnswer = '';
  }
}
