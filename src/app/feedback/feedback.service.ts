import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest, } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Categorie } from '../categorie/Categorie';
import { Feedback } from './Feedback';
import { Http, Response } from '@angular/http';
import { LoginService } from '../login/login.service';
import { FeedbackFile } from './FeedbackFile';
import { stringify } from 'querystring';
import { Affectation } from '../personnes-concernee/Affectation';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class FeedbackService {

  constructor(private http: HttpClient, private login: LoginService) {
  }
  private listeNmesURL = 'http://localhost:8080/FEEDBACK/api/loadEmployeNames';
  private feedbackUrl = 'http://localhost:8080/FEEDBACK/api/addFeedback';
  private mailURL = 'http://localhost:8080/simpleemail2';
  private MesFeedbacksURL = 'http://localhost:8080/FEEDBACK/api/loadFeedbackByIdUser'/*+`/${this.login.getId()}`*/;
  private FeedbackPubliqueURL = 'http://localhost:8080/FEEDBACK/api/loadFeedabackPubique';
  private NbAnomalie = 'http://localhost:8080/FEEDBACK/api/nmbrAnomalie'/*+`/${this.login.getId()}`*/;
  private NbProposition = 'http://localhost:8080/FEEDBACK/api/nmbrProposition'/*+`/${this.login.getId()}`*/;
  private AllFeedbacksURL = 'http://localhost:8080/FEEDBACK/api/loadAllFeedback';
  private getEmployeNameURL = 'http://localhost:8080/FEEDBACK/api/FindIdByloginUser';
  private addaffectionURL = 'http://localhost:8080/FEEDBACK/api/AddAffectation';
  private GetaffectionURL = 'http://localhost:8080/FEEDBACK/api/LoadAffectation';
  private SetVisilityURL = 'http://localhost:8080/FEEDBACK/api/SetVisiblity';
  private checkURL = 'http://localhost:8080/FEEDBACK/api/check';
  private DeleteAffectationURL = "http://localhost:8080/FEEDBACK/api/DeleteAffectation"
  private SetEtatURL = 'http://localhost:8080/FEEDBACK/api/SetEtat';
  private SetEtatPropositionURL = 'http://localhost:8080/FEEDBACK/api/SetEtatProposition';
  private SetEtatPropositionRevoirURL = 'http://localhost:8080/FEEDBACK/api/SetPropositionRevoir';
  private SetEtatAnomalieURL = 'http://localhost:8080/FEEDBACK/api/SetEtatAnomalie';
  private SetEtatAnomalie2URL = 'http://localhost:8080/FEEDBACK/api/SetEtatAnomalie2';
  private SetEtatAnomalieResoluURL = 'http://localhost:8080/FEEDBACK/api/SetAnomalieResolu';
  private getNBFeedabckTraiteURL = 'http://localhost:8080/FEEDBACK/api/getNBFeedbackTraite';

  getNBFeedbackTraite(): Observable<number> {
    return this.http.get<number>(this.getNBFeedabckTraiteURL);
  }

  SetEtatAnomalie(id: number): Observable<boolean> {
    return this.http.put<boolean>(this.SetEtatAnomalieURL + `/${id}`, httpOptions);
  }
  SetEtatAnomalie2(id: number): Observable<boolean> {
    return this.http.put<boolean>(this.SetEtatAnomalie2URL + `/${id}`, httpOptions);
  }

  SetEtatAnomalieResolu(id: number): Observable<boolean> {
    return this.http.put<boolean>(this.SetEtatAnomalieResoluURL + `/${id}`, httpOptions);
  }


  DeleteAffectation(id: number, id1: number): Observable<boolean> {
    return this.http.delete<boolean>(this.DeleteAffectationURL + `/${id}` + `/${id1}`);
  }
  setEtat(id: number): Observable<boolean> {
    return this.http.put<boolean>(this.SetEtatURL + `/${id}`, httpOptions);
  }

  SetEtatProposition(id: number): Observable<boolean> {
    return this.http.put<boolean>(this.SetEtatPropositionURL + `/${id}`, httpOptions);
  }
  SetEtatPropositionRevoir(id: number): Observable<boolean> {
    return this.http.put<boolean>(this.SetEtatPropositionRevoirURL + `/${id}`, httpOptions);
  }

  public createF(feedback: Feedback): Observable<Feedback> {
    console.log('from service : ', feedback);
    return this.http.post<Feedback>(this.feedbackUrl, feedback, httpOptions);
  }

  ajouterDocument(file: File, fDTO: number): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', 'http://localhost:8080/FEEDBACK/api/uploadFile' + `/${fDTO}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }
  addAff(aff: Affectation): Observable<Affectation> {
    return this.http.post<Affectation>(this.addaffectionURL, aff, httpOptions);
  }
  setVisibility(id: number): Observable<boolean> {
    return this.http.put<boolean>(this.SetVisilityURL + `/${id}`, httpOptions);
  }
  LoadMyFeedbacks(id: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.MesFeedbacksURL + `/${id}`);
  }
  GetPersonne(name: string): Observable<number> {
    return this.http.get<number>(this.getEmployeNameURL + `?login_user=` + name);
  }
  LoadNames(): Observable<string[]> {
    return this.http.get<string[]>(this.listeNmesURL);
  }
  getProfileBySocId(): Promise<any[]> {

    return this.http.get(this.listeNmesURL)
      .toPromise()
      .catch(this.handleError);

  }
  search_word() {
    return this.http.get(this.listeNmesURL);
  }
  LoadPublicFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.FeedbackPubliqueURL);
  }
  loadNbProposition(id: number): Observable<number> {
    return this.http.get<number>(this.NbProposition + `/${id}`);
  }
  loadNbAnomalie(id: number): Observable<number> {
    return this.http.get<number>(this.NbAnomalie + `/${id}`);
  }
  check(id: number, id1: number): Observable<number> {
    return this.http.get<number>(this.checkURL + `/${id}` + `/${id1}`);
  }

  public getAllFeedback(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.AllFeedbacksURL);
  }
  public getFeedbackById(idFeedback: number): Observable<Feedback> {
    return this.http.get<Feedback>("http://localhost:8080/FEEDBACK/api/loadFeedback/" + idFeedback);
  }

  public getAllFile(): Observable<FeedbackFile[]> {
    return this.http.get<FeedbackFile[]>("http://localhost:8080/FEEDBACK/api/loadAllfile");
  }

  downloadFile(file: String) {
    return this.http.get("http://localhost:8080/FEEDBACK/api/DownloadFile/" + file)


  }

  public feedbackWithFile() {
    return this.http.get<number[]>("http://localhost:8080/FEEDBACK/api/feedbackAvecFile");
  }
  public AffectationByFeedback(id: number): Observable<Affectation[]> {
    return this.http.get<Affectation[]>(this.GetaffectionURL + `/${id}`);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }

}
