import { Injectable } from '@angular/core';
import { Enquete, Person } from '../enquete';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
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
    return this.http.post<SurveyResponse>(`http://localhost:8088/api/surveys/${response.surveyId}/responses?connected-user=${connectedUser}`, response);
  }

  getAllResponses(surveyId: Number, connectedUser: Number): Observable<SurveyResponse[]> {
    return this.http.get<SurveyResponse[]>(`http://localhost:8088/api/surveys/${surveyId}/responses?connected-user=${connectedUser}`)
      .catch(this.errorHandler);
  }

  getMyResponse(surveyId: Number, connectedUser: Number): Observable<SurveyResponse> {
    return this.http.get<SurveyResponse>(`http://localhost:8088/api/surveys/${surveyId}/my-response?connected-user=${connectedUser}`)
      .catch(this.errorHandler);
  }

  getEmployees(): Observable<Person[]> {
    return this.http.get<Person[]>(`http://localhost:8088/api/employees`)
      .catch(this.errorHandler);
  }

  isAuthorized(surveyId: Number, connectedUser: Number): Observable<Boolean> {
    return this.http.get<Boolean>(`http://localhost:8088/api/surveys/${surveyId}/isAuthorized?connected-user=${connectedUser}`);
  }

  getReport(surveyId: Number, connectedUser: Number): Observable<any> {
    return this.http.get<any>(`http://localhost:8088/api/surveys/${surveyId}/report?connected-user=${connectedUser}`);
  }

}
