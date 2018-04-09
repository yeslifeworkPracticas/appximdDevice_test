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
  mensaje: string;

  constructor(public navCtrl: NavController) {
    this.mensaje = "Algo";
    this.ws = new WebSocket("ws://192.168.1.53:8080/Server/WebSocketServer", []);

    this.ws.onopen = () => {
      console.log('open');
    };

    this.ws.onmessage = (event) => {
      var msg = event.data;
      alert(msg);
      this.mensaje = msg;
    };
    
    this.ws.onerror = () => {
      console.log('error occurred!');
    };

    this.ws.onclose = (event) => {
      console.log('close code=' + event.code);
    };
  }

  answerWebSocketServer(msg) {
    this.clientAnswer = "clientAnswer: " + msg;
    this.ws.send(this.clientAnswer);
    this.clientAnswer = '';
  }
}
