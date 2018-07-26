import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {Http} from '@angular/http';
import {HttpClient, HttpEvent, HttpRequest,} from '@angular/common/http';
import {ReponseDTO} from './Reponse';
import {Observable} from 'rxjs/Observable';
import {RepFeedback} from '../Model/ReponseFeedback';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class ReponseService {

  constructor(private http: HttpClient) { }

  public getNbrRep(): Observable<RepFeedback[]>{
    return this.http.get<RepFeedback[]>("http://localhost:8080/FEEDBACK/api/loadRep");
}




  public getReponseByIdFeedback(idFeedback: number):Observable<ReponseDTO[]>{
    return this.http.get<ReponseDTO[]>("http://localhost:8080/FEEDBACK/api/loadReponseParIdFeedback/"+idFeedback);

  }
  public getAllResponse(){
    return this.http.get("http://localhost:8080/FEEDBACK/api/loadAllReponse");
  }
  public feedbackWithResponse():Observable<number[]>{
    return this.http.get<number[]>("http://localhost:8080/FEEDBACK/api/feedbackAvecReponse");
  }

  public addReponse(reponse: ReponseDTO): Observable<ReponseDTO> {
    console.log('from service : ', reponse);
    return this.http.post<ReponseDTO>("http://localhost:8080/FEEDBACK/api/addNewResponse", reponse, httpOptions);
  }

  public feedbackPublicWithResponse():Observable<number[]>{
    return this.http.get<number[]>("http://localhost:8080/FEEDBACK/api/feedbackPublicAvecReponse");
  }

  public feedbackPersonelWithResponse(idPers: number):Observable<number[]>{
    return this.http.get<number[]>("http://localhost:8080/FEEDBACK/api/feedbackAvecReponsePersonel/"+idPers);
  }





}
