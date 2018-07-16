import {Injectable} from '@angular/core';
import {Categorie} from './Categorie';
import {Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';

@Injectable()
export class CategorieService {

  private apiUrl = 'http://localhost:8080/FEEDBACK/api/loadAllCategorie';
  private apiUrl1 = 'http://localhost:8080/FEEDBACK/api/loadCategorie';


  constructor(private http: HttpClient) {

  }

  findAll(): Observable<Categorie[]> {
    return this.http.get(this.apiUrl);
  }

  findOne(id: number): Observable<Categorie> {
    return this.http.get(this.apiUrl1 + `/${id}`);
  }


  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }


}
