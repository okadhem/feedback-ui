import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService} from '../user/user.service';
import {UserDTO} from '../user/User';
import {DataService} from '../websocket/data.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error='';
  loading= false;
  loginPage:UserDTO = new UserDTO();
  load=true;
  max: number = 10;
  rate: number = 7;
  isReadonly: boolean = true;
  ws: any;
  notif: boolean;
  nameSend: string;

  constructor(private loginService: LoginService, private http: HttpClient, private router: Router, private user: UserService , private dataService :DataService) {
  }

  login() {
    this.loginService.getUserByLogin(this.loginPage)
      .subscribe(data=>{
        this.load=false;

        console.log("the data is",data)

        if(data== true ){

          this.user.setUserLoggedIn();
          this.load=false;
          this.router.navigateByUrl("/home");
          this.loginService.setLoggedIn(true);
          console.log("test id dans login.ts", this.loginService.getId());
          if(this.loginService.getLogin().substring(0, this.loginService.getLogin().indexOf('.'))==="support" ){
            let socket = new WebSocket("ws://localhost:8087/greeting");
            this.ws = Stomp.over(socket);
            let that = this;
            this.ws.connect({}, function(frame){
              that.ws.subscribe("/errors", function (message) {
                alert("Error " + message.body);

              });

              that.ws.subscribe("/notification/notif",function(notif){
                console.log("test de  notif dans login module en utilisant le ws", notif.body);
                console.log("test login test ws ")
                //console.log("test de l'update de name dans login et a traver  websocket",this.nameSend);
                that.dataService.changeNotif(true);

              })
            })

          }


        }
        else{
          console.log("Ereur dans login.ts");
          this.error = 'Username or password is incorrect';
        }
      }, (error) => {
        console.log("verifier votre login");
        this.error = 'Username or password is incorrect';
        this.loading = false;

      })

    /*
    if(this.loginPage.login=="Anissa" && this.loginPage.password=="chekir"){
      this.router.navigateByUrl("/home");
    }else{
      console.log("Eror 404");
    }*/

  }


  ngOnInit() {
  }



}
