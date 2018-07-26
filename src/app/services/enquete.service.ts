import { Injectable } from '@angular/core';
import { Enquete } from '../enquete';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { catchError } from 'rxjs/operators';

@Injectable()
export class EnqueteService {

  constructor(private http: HttpClient) { }

  addEnquete(enquete: Enquete): Observable<Enquete> {
    return this.http.post<Enquete>('http://localhost:8088/api/enquetes', enquete);
  }

  getEnquetes(): Observable<Enquete[]> {
    return this.http.get<Enquete[]>('http://localhost:8088/api/enquetes')
      .catch(this.errorHandler);
  }

  getSurvey(id: Number): Observable<Enquete> {
    return this.http.get<Enquete>(`http://localhost:8088/api/enquetes/${id}`)
      .catch(this.errorHandler);
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error');
  }
  
}
