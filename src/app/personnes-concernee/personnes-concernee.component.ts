import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {FormControl} from '@angular/forms';
import {ReponseService} from '../reponse/reponse.service';
import {FeedbackService} from '../feedback/feedback.service';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Affectation} from './Affectation';
import {LoginService} from '../login/login.service';
import {DataService} from '../websocket/data.service';

declare var swal: any;

@Component({
  selector: 'app-personnes-concernee',
  templateUrl: './personnes-concernee.component.html',
  styleUrls: ['./personnes-concernee.component.css'],
  providers: [FeedbackService, ReponseService]
})
export class PersonnesConcerneeComponent implements OnInit {
  deleteAffectation: boolean;
  test: number;
  names: string[];
  aff: Affectation = new Affectation();
  aff1: Affectation = new Affectation();
  EtatAffecte: boolean;
  nameempl: string;
  personne: string;
  public Names: string[] = [];
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;
  n: number;
  updateWorkflow:boolean;
  EtatAffecte1:boolean;
  constructor(private reponseService: ReponseService, private feedbackService: FeedbackService, public dialogRef: MatDialogRef<PersonnesConcerneeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private  loginService: LoginService , private dataService :DataService) {


    this.stateCtrl = new FormControl();

    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this.filterStates(state.toString()) : this.Names.slice()));

  }

  onNoClick(): void {
    this.dialogRef.close();
    console.log('test', this.personne);
  }

  filterStates(name: string) {
    return this.Names.filter(state =>
      state.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  ngOnInit() {
    this.dataService.currentUpdateWorkflow.subscribe(update=>this.updateWorkflow=update);
    this.names = this.data.namesT;
    this.feedbackService.LoadNames().subscribe(names => {
        this.Names = names;

      }
    );
  }


  AffecterUser() {
    this.feedbackService.GetPersonne(this.personne).subscribe(affectation => {
        this.n = affectation;
        this.aff.employee.id = this.n;
        this.aff.feedback.idFeedback = this.data.id;
        this.feedbackService.check(this.aff.feedback.idFeedback, this.aff.employee.id).subscribe(count => {
            this.test = count;
            if (this.test == null) {
              this.feedbackService.setEtat(this.aff.feedback.idFeedback).subscribe(setEtat => this.EtatAffecte = setEtat);
              this.feedbackService.addAff(this.aff).subscribe(x => {
                this.aff = x;
                this.dataService.changeUpdateWorkflow(true);
              });
              this.showAlert();
            }
            else {
              this.exists();
            }
          }
        );
      }
    );
  }

  showAlert() {

    swal(
      'Ajouté!',
      'vous avez affecter ce feedback à ' + this.personne,
      'success',
    );

  }

  exists() {

    swal(
      'sorry!',
      'exists ',
      'error',
    );

  }

  showAlert1() {

    swal(
      'Ajouté!',
      'vous avez affecter ce feedback à ' +JSON.parse(localStorage.getItem('currentUser')).fullName,
      'success',
    );

  }

  Melaffecter() {

    this.aff1.employee.id =JSON.parse(localStorage.getItem('currentUser')).personnelId;
    console.log(this.loginService.getName());
    this.aff1.feedback.idFeedback = this.data.id;
    this.feedbackService.check(this.aff1.feedback.idFeedback, this.aff1.employee.id).subscribe(count => {
        this.test = count;
        if (this.test == null) {
          this.feedbackService.addAff(this.aff1).subscribe(x => {this.aff1 = x ;
            this.dataService.changeUpdateWorkflow(true);
          });
          this.feedbackService.setEtat(this.aff1.feedback.idFeedback).subscribe(setEtat => this.EtatAffecte1 = setEtat);
          this.showAlert1();

        }
        else {
          this.exists();
        }
      }
    );
  }

}
