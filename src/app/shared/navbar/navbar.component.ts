import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {LoginService} from '../../login/login.service';
import {Router} from '@angular/router';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  today:any = Date.now();
  notifSupport : boolean = false;
ws:any;
  constructor(private loginService:LoginService, private authService:AuthService, private router:Router) { }

  ngOnInit() {

    if(JSON.parse(localStorage.getItem('currentUser')).login.substring(0, JSON.parse(localStorage.getItem('currentUser')).login.indexOf('.'))==="support" ){
      this.notifSupport=true;
    }


  }
  close(){
    console.log("test logout")
    this.authService.logout();
    if(this.authService.isLoggedOut()){

      this.router.navigateByUrl("/login");

    }
  }

  disconnect() {
    if (this.ws != null){
      this.ws.ws.close();
    }

    console.log("Disconnected");
  }

}

