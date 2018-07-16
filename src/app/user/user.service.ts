import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
@Injectable()
export class UserService {

  private isUserLoggedIn;
  private username;

  constructor(private http:Http) {
    this.isUserLoggedIn=false;
  }

  setUserLoggedIn(){
    this.isUserLoggedIn=true;
  }

  getUserLoggedIn(){
    return this.isUserLoggedIn;


  }

  loadUserById(idUser: number){
    return this.http.get('http://localhost:8080/FEEDBACK/api/loqdUserById/'+idUser).map(res=>res.json());
  }


}



