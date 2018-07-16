import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';
import {DataService} from '../websocket/data.service';
import {AuthService} from '../services/auth.service';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  ws: any;

  disabled: boolean;
  updateReponse : boolean;
  updateAllFeedback: boolean;
  updateFeedbackPublique: boolean;
  workflow:boolean

  hide = true;
  error='';
  loading= false;
  //loginPage:UserDTO = new UserDTO();
  load=true;
  max: number = 10;
  rate: number = 7;
  isReadonly: boolean = true;

  notif: boolean;
  nameSend: string;
  form: FormGroup;
  result:any;
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router, private dataService :DataService) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  login() {
    const val = this.form.value;
    if (val.email && val.password) {
      this.authService.login(val.email, val.password)
        .subscribe(
          res => {

            if (this.authService.getLoggedInUser()) {

              this.router.navigateByUrl('/home');
             // if(JSON.parse(localStorage.getItem('currentUser')).login.substring(0, JSON.parse(localStorage.getItem('currentUser')).login.indexOf('.'))==="support" ){
                /*let socket = new WebSocket("ws://localhost:8087/greeting");
                this.ws = Stomp.over(socket);
                let that = this;
                this.ws.connect({}, function(frame){
                  that.ws.subscribe("/errors", function (message) {
                    alert("Error " + message.body);
                  });


                })*/

            //  }

              this.connect()
            }
          }
        );
    }



  }

  ngOnInit() {
    this.dataService.currentUpdateReponse.subscribe(update=>this.updateReponse=update);
    this.dataService.currentUpadteAllFeedback.subscribe(x=>this.updateAllFeedback=x);
    this.dataService.currentUpdateFeedbackPub.subscribe(x=>this.updateFeedbackPublique=x);
    this.dataService.currentUpdateWorkflow.subscribe(x=>this.workflow=x);
    this.dataService.currentNotif.subscribe(x=>this.notif=x);
  }

  connect() {
    //connect to stomp where stomp endpoint is exposed
    //let ws = new SockJS("http://localhost:8087/greeting");
    let socket = new WebSocket("ws://localhost:8087/greeting");
    this.ws = Stomp.over(socket);
    let that = this;
    this.ws.connect({}, function (frame) {
      that.ws.subscribe("/errors", function (message) {
        alert("Error " + message.body);
      });

      that.ws.subscribe("/topic/reply", function (message) {
        //console.log("test msg test anissaaaaa")
        console.log("test dans aapp module pour l'auter utilisateur ",message.body.name);
        console.log("add reponse ws test ")
        that.dataService.changeUpdateReponse(true);

        //console.log("test msg test anissaaaaa")
        //that.showGreeting(message.body);
      });
      that.ws.subscribe("/topic/send", function(msg){
        console.log("test de l'update dans l,ajout d'un nouveau feedback", msg.body);

        if(msg.body == 'true'){
          //console.log("test de l'update")
          that.dataService.changeUpdateAllFeedback(true);
          that.dataService.changeUpdateFeedbackPub(true);
          //console.log("test de helooooo")

        }

      });
      that.ws.subscribe("/notification/notif",function(notif){
        console.log("test de webSocket Anissaaaaaa");
        console.log("test de  notif dans login module en utilisant le ws", notif.body);
        //console.log("test de l'update de name dans login et a traver  websocket",this.nameSend);
        console.log("test login notif")
        that.dataService.changeNotif(true);

      })
      that.ws.subscribe("/updateWorkflow/workflow", function(workflow){

        console.log("test de  notif dans login module en utilisant le ws", workflow.body);
        that.dataService.changeUpdateWorkflow(true);
      });
      that.disabled = true;

    }, function (error) {
      alert("STOMP error " + error);
    });
  }

}


