import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {UserDTO} from '../user/User';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService {



  private name: string;
  private login : string;


  private id: number;
  private loggedIn:boolean = false;
  public token: string;
  private loadUser = 'http://localhost:8080/FEEDBACK/api/login';

  setId(idLog :number): void{
    this.id=idLog;
  }
  getId():number{
    return this.id;
  }
  setName(name : string):void{
    this.name=name;
  }
  getName(): string{
    return this.name;
  }

  setLogin(login : string): void{
    this.login= login;
  }
  getLogin(): string{
    return this.login;
  }




  constructor(private http:Http) { }

  isLoggedIn(): boolean{
    return this.loggedIn;
  }

  setLoggedIn(newState:boolean) :void {
    this.loggedIn = newState;
  }

  /*
   public isAuthenticated(): boolean {
     let jwtHelper: JwtHelper = new JwtHelperService();
     const token = localStorage.getItem('token');
     // Check whether the token is expired and return
     // true or false
     return !this.jwtHelper.isTokenExpired(token);
   }*/

  /**
   * verifier si le login et le mdp existe dans la BD
   * @param user
   */
  getUserByLogin(user : UserDTO): Observable<boolean>{
    console.log('from service : ', user);
    return this.http.post(this.loadUser, user).map((resp)=>{
      let token= resp.json();
      console.log("token is from login.service.ts", token)
      if (token) {
        // set token property
        this.token = token;
        console.log("test login and mdp id du personne ", token.personnelId);
        this.setId(token.personnelId);
        this.setLogin(token.login);
        this.setName(token.name);



        // return true to indicate successful login
        return true;
      } else {
        // return false to indicate failed login
        return false;
      }
    });
  }








}
