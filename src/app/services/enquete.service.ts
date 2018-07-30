import { Injectable } from '@angular/core';
import { Enquete } from '../enquete';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { SurveyResponse } from '../surveyResponse';

@Injectable()
export class EnqueteService {

  constructor(private http: HttpClient) { }

  addSurvey(enquete: Enquete, connectedUser: Number): Observable<Enquete> {
    return this.http.post<Enquete>(`http://localhost:8088/api/surveys?connected-user=${connectedUser}`, enquete);
  }

  getSurveys(connectedUser: Number): Observable<Enquete[]> {
    return this.http.get<Enquete[]>(`http://localhost:8088/api/surveys?connected-user=${connectedUser}`)
      .catch(this.errorHandler);
  }

  getSurvey(id: Number, connectedUser: Number): Observable<Enquete> {
    return this.http.get<Enquete>(`http://localhost:8088/api/surveys/${id}?connected-user=${connectedUser}`)
      .catch(this.errorHandler);
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error');
  }

  addResponse(response: SurveyResponse, connectedUser: Number): Observable<SurveyResponse> {
    return this.http.post<SurveyResponse>(`http://localhost:8088/api/surveys/${response.idSurvey}/responses?connected-user=${connectedUser}`, response);
  }

  getAllResponses(idSurvey: Number, connectedUser: Number): Observable<SurveyResponse[]> {
    return this.http.get<SurveyResponse[]>(`http://localhost:8088/api/surveys/${idSurvey}/responses?connected-user=${connectedUser}`)
      .catch(this.errorHandler);
  }

  getMyResponse(idSurvey: Number, connectedUser: Number): Observable<SurveyResponse> {
    return this.http.get<SurveyResponse>(`http://localhost:8088/api/surveys/${idSurvey}/my-response?connected-user=${connectedUser}`)
      .catch(this.errorHandler);
  }

}
