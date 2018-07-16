import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Feedback} from '../feedback/Feedback';
import {ThemeAvis} from './ThemeAvis';
import {Response} from '@angular/http';
import {Categorie} from '../categorie/Categorie';
import {Avis} from './Avis';
import {LoginService} from '../login/login.service';
import {AvisUtile} from '../Model/AvisUtile';
import {NbrUtile} from '../Model/nbrUtile';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AvisService {
  constructor(private http: HttpClient, private login:LoginService) { }
  private AllThemeURL = 'http://localhost:8080/FEEDBACK/api/themeNonTraite'+ `/${JSON.parse(localStorage.getItem('currentUser')).personnelId}`;
  private getThemeURL = 'http://localhost:8080/FEEDBACK/api/loadThemeById';
  private AddAvisURL = 'http://localhost:8080/FEEDBACK/api/addAvis';
  private AllThemes1URL = 'http://localhost:8080/FEEDBACK/api/loadAllTheme';
  private loadNBParticipantURL='http://localhost:8080/FEEDBACK/api/LoadNBParticipant';
  private AddUtileURL='http://localhost:8080/FEEDBACK/api/addNewUtile';
  private DeleteThemeURL='http://localhost:8080/FEEDBACK/api/DeleteTheme';





  AddAvisUtile(AvisUtile : AvisUtile){
    return this.http.post<AvisUtile>(this.AddUtileURL, AvisUtile, httpOptions);
  }

  LOADNBParticipant():Observable<number>{
    return this.http.get(this.loadNBParticipantURL);
  }

  private AddThemes1URL = 'http://localhost:8080/FEEDBACK/api/addNewTheme';
  LoadAllThemes1(): Observable<ThemeAvis[]> {
    return this.http.get<ThemeAvis[]>(this.AllThemes1URL);

  }

  LoadAllThemes(): Observable<ThemeAvis[]> {
    return this.http.get<ThemeAvis[]>(this.AllThemeURL);

  }
  findOneTheme(id: number): Observable<ThemeAvis> {

    return this.http.get<ThemeAvis>(this.getThemeURL + `/${id}`);
  }
  AddAvis(Avis : Avis):Observable<Avis>{
    return this.http.post(this.AddAvisURL, Avis, httpOptions);
  }

  loadAvisByIdTheme(id: number):Observable<Avis[]>{
    return this.http.get("http://localhost:8080/FEEDBACK/api/loadAvisByIdTheme/"+`${id}`)
  }
  loadMoyenneRate(id:number):Observable<number[]>{
    return this.http.get("http://localhost:8080/FEEDBACK/api/loadMoyenneRate/"+`${id}`)
  }

  addTheme(theme : ThemeAvis):Observable<ThemeAvis>{
    return this.http.post(this.AddThemes1URL,theme, httpOptions);
  }
  loadAllAvisUtile():Observable<AvisUtile[]>{
    return this.http.get<AvisUtile[]>("http://localhost:8080/FEEDBACK/api/loadAllUtileList");
  }

  loadNbrUtileByAvis(): Observable<NbrUtile[]>{
    return this.http.get<NbrUtile[]>("http://localhost:8080/FEEDBACK/api/loadNbrUtileByAvis");
  }

  DeleteTheme(idTheme: number): Observable<boolean>{
    return this.http.delete<boolean>("http://localhost:8080/FEEDBACK/api/DeleteTheme/"+`${idTheme}`);
  }

  deleteUtil(idUtil : number): Observable<boolean>{
    return this.http.delete<boolean>("http://localhost:8080/FEEDBACK/api/deleteUtile/"+`${idUtil}`);
  }



}


