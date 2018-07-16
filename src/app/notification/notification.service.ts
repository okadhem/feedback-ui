import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';

import { LoginService } from '../login/login.service';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import {Notification} from './Notification';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'

  })
};

@Injectable()
export class NotificationService {

  constructor(private http: HttpClient, private login: LoginService) { }

  public createNotif(notif : Notification): Observable<Notification>{
    return this.http.post("http://localhost:8080/FEEDBACK/api/addNotif", notif, httpOptions);
  }

  public loadNOtif(): Observable<Notification[]>{
    return this.http.get("http://localhost:8080/FEEDBACK/api/loadNotif");
  }

  public updateEtatNotif(id: number, etat:string){
    return this.http.put<boolean>("http://localhost:8080/FEEDBACK/api/updateNotif/"+id+"/"+etat,null);
  }



  public NotifNonVu():Observable<Notification[]>{
    return this.http.get("http://localhost:8080/FEEDBACK/api/loadNotifNonVu");
  }
}


