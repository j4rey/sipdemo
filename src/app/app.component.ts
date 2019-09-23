import { Component } from "@angular/core";
import * as JsSIP from "jssip";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent {
  title = "sipdemo";
  ua = null
  aWebSocket = null;
  
  debugConfig = {
    url: "ws://localhost:5060",
    sip: {
      uri: "sip:username@localsip.local",
      display_name: 'username',
      authorization_user: 'username',
      password:"1234"
    }
  }
  
  prodConfig = {
    url: environment.url,
    sip: {
      uri: environment.sip.uri,
      display_name: environment.sip.display_name,
      authorization_user: environment.sip.authorization_user,
      password:environment.sip.password
    }
  }

  config = this.debugConfig;


  constructor() {
    JsSIP.debug.enable("JsSIP:*");
  }

  onCheckboxChange(e:boolean){
    if(e){
      this.config = this.prodConfig;
    }
    else{
      this.config = this.debugConfig;
    }
  }

  webSocketStartConnection(){
    this.aWebSocket = new WebSocket(
      this.config.url
    );
    this.aWebSocket.onopen = function(event) {
      console.log("WebSocket is open now.");
    };

    this.aWebSocket.onerror = function(event) {
      console.error("WebSocket error observed:", event);
    };
  }

  jssipStartConnection() {
    // Create our JsSIP instance and run it:

    var socket = new JsSIP.WebSocketInterface(this.config.url);
    
    var configuration = {
      sockets: [socket],
      uri: this.config.sip.uri,
      display_name:this.config.sip.display_name,
      authorization_user: this.config.sip.authorization_user,
      password:this.config.sip.password
    };

    var ua = new JsSIP.UA(configuration);
    ua.on("registered", function(e) {
      console.log("registered");
    });
    ua.on("unregistered", function(e) {
      console.log("unregistered");
    });
    ua.on("registrationFailed", function(e) {
      console.log("registrationFailed", e);
    });
    ua.start();
    this.ua = ua;
  }

  closeConnection() {
    if (this.aWebSocket) {
      this.aWebSocket.close();
    }
    if(this.ua){
      this.ua.stop();
    }
  }

  call() {
    // Register callbacks to desired call events
    var eventHandlers = {
      progress: (e: any) => {
        console.log("call is in progress");
      },
      failed: (e: any) => {
        console.log("call failed with cause: ", e);
      },
      ended: (e: any) => {
        console.log("call ended with cause: ", e);
      },
      confirmed: (e: any) => {
        console.log("call confirmed");
      }
    };

    var options = {
      eventHandlers: eventHandlers
      //mediaConstraints: { audio: true, video: false }
    };

    this.session = this.ua.call("sip:user1@officesip.local", options);
  }

  session;
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.ua != null) {
      this.ua.stop();
      this.ua = null;
    }
  }

  sendMessage() {
    // Register callbacks to desired message events
    var eventHandlers = {
      succeeded: function(e) {
        console.log("success", e);
      },
      failed: function(e) {
        console.log("failed", e);
      }
    };

    var options = {
      eventHandlers: eventHandlers
    };

    this.ua.sendMessage("sip:user1@officesip.local", "Hello", options);
  }
}
