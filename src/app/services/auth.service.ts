import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/do';


import * as moment from 'moment';
import { User } from '../Model/user';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'

  })
};

@Injectable()
export class AuthService {

  private name: string;
  private loginUser : string;


  private id: number;
  public token: string;




  /**
   * Dev
   */

  constructor(private http: HttpClient) {

  }
  login(username: string, password: string ) {
    return this.http.post('http://localhost:8080/AUTH/token/generate-token', {username, password})
      .do(res => {

        console.log(JSON.stringify(res))

        this.setSession(res);
      })
      // this is just the HTTP call,
      // we still need to handle the reception of the token
      .shareReplay();
  }


  private setSession(authResult) {
    console.log()
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('id_token', authResult.token.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('currentUser', JSON.stringify(authResult.user));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('currentUser');
  }
  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }
  isLoggedOut() {
    return !this.isLoggedIn();
  }
  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
  getLoggedInUser(): User {
    const user: User = JSON.parse(localStorage.getItem('currentUser'));

    return user;
  }

  test() {
    return this.http.get('http://localhost:9999/user/test', { responseType: 'text' });
  }



}




