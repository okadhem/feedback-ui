import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class StatService {

  constructor(private http: HttpClient) {
  }

  private PropositionURL = 'http://localhost:8080/FEEDBACK/api/GetStatistiqueProp';
  private KeyURL = 'http://localhost:8080/FEEDBACK/api/KeyStatistique';
  private ValueAnomalieURL = 'http://localhost:8080/FEEDBACK/api/ValueAnomalieStat';
  private ValuePropositionURL = 'http://localhost:8080/FEEDBACK/api/ValuePropositionStat';
  private KeyPropURL = 'http://localhost:8080/FEEDBACK/api/KeyStatistiqueProposition';

  /* private AnomalieURL = 'http://localhost:8080/FEEDBACK/api/GetStatistiqueanomalie';*/

  loadStatProposition(): Observable<number[]> {
    return this.http.get(this.PropositionURL);
  }


  loadKey(): Observable<String[]> {
    return this.http.get(this.KeyURL);
  }
  loadKeyProp(): Observable<String[]> {
    return this.http.get(this.KeyPropURL);
  }

  loadPropositionValue(): Observable<number[]> {
    return this.http.get(this.ValuePropositionURL);
  }

  loadAnomalieValue(): Observable<number[]> {
    return this.http.get(this.ValueAnomalieURL);
  }

  /*loadStatAnomalie():Observable<number>{
    return this.http.get(this.AnomalieURL);
  }
*/
}
