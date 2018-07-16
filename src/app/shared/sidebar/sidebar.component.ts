import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../login/login.service';
import {AuthService} from '../../services/auth.service';




@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  //user : UserDTO;
  private name: string;
  constructor(private loginService:LoginService , private router : Router,  private auth:AuthService) { }

  ngOnInit() {
    /*
       this.userService.loadUserById(JSON.parse(localStorage.getItem('currentUser')).personnelId).subscribe(x=>{
         this.user=x;
       })*/
    this.name=JSON.parse(localStorage.getItem('currentUser')).lastName;
  }
  feedbackPage(){



    if(JSON.parse(localStorage.getItem('currentUser')).login.substring(0, JSON.parse(localStorage.getItem('currentUser')).login.indexOf('.'))==="support" ){
      this.router.navigateByUrl("/home/Support");

    }
    else{
      this.router.navigateByUrl("/home/Collaborateur");

    }

  }




}


