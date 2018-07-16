import {Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FeedbackService} from '../feedback.service';
import {Feedback} from '../Feedback';
import {ReponseService} from '../../reponse/reponse.service';
import {ReponseDTO} from '../../reponse/Reponse';
import {Observable} from 'rxjs/Observable';
import {FormControl} from '@angular/forms';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {UserDTO} from '../../user/User';
import {PersonnesConcerneeComponent} from '../../personnes-concernee/personnes-concernee.component';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {LoginService} from '../../login/login.service';
import {Affectation} from '../../personnes-concernee/Affectation';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';
import {DataService} from '../../websocket/data.service';

@Component({
  selector: 'app-detail-feedback',
  templateUrl: './detail-feedback.component.html',
  styleUrls: ['./detail-feedback.component.css'],
  providers: [FeedbackService, ReponseService]
})
export class DetailFeedbackComponent implements OnInit, OnChanges , DoCheck {


  ngDoCheck(): void {
    //console.log("tet de l'update de workflow ",this.updateWorkflow)
    if((this.updat)||(this.updateWorkflow)||(this.updateWorkflow1)){
      console.log("Respoinse tes test test")
      this.ready=false;

      this.updat=false;
      this.updateWorkflow=false;
      this.updateWorkflow1=false;
      this.ngOnChanges();
      this.reponseSevice.getReponseByIdFeedback(this.id).subscribe(x => {
        this.reponse = x;
        this.ready=true;

      });
    }
    this.dataService.changeUpdateReponse(false);
    this.dataService.changeUpdateWorkflow(false);


  }


  affectationsList:Affectation[]=[];
  public Names: string[] = [];
  stateCtrl: FormControl;
  reponse: ReponseDTO[] = [];
  feedbackDetail: Feedback;
  userDetail: UserDTO;
  rout:string;
  filteredStates: Observable<any[]>;
  @Input() id: number;
  test: boolean = false;
  rep: ReponseDTO;
  reponseAdd: ReponseDTO = new ReponseDTO();
  @Output() testRep: EventEmitter<boolean> = new EventEmitter();
  title = 'app';
  greetings: string[] = [];
  showConversation: boolean = false;
  ws: any;
  name: string;
  nameConnected: string;
  disabled: boolean;
  ready:boolean=true;
  updat:boolean;
  updateWorkflow1:boolean;
  updateWorkflow:boolean=true;
  resolu:boolean;

  constructor(private feedbackService: FeedbackService, private reponseSevice: ReponseService, public dialog: MatDialog,private root:Router , private loginService: LoginService, private dataService:DataService


  ) { let socket = new WebSocket("ws://localhost:8087/greeting");

    this.ws = Stomp.over(socket);
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this.filterStates(state.toString()) : this.Names.slice()));
  }

  filterStates(name: string) {
    return this.Names.filter(state =>
      state.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  ngOnInit() {
    this.getAffectationByFeedback();
    this.nameConnected =JSON.parse(localStorage.getItem('currentUser')).lastName
    this.feedbackService.LoadNames().subscribe(x => {
        this.Names = x;
      }
    );
    this.dataService.currentUpdateReponse.subscribe(update=> this.updat=update);
    this.dataService.currentUpdateWorkflow.subscribe(update=> this.updateWorkflow=update);
    this.dataService.currentUpdateWorkflowsetProp.subscribe(update=> this.updateWorkflow1=update);
  this.rout=this.root.url;
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(PersonnesConcerneeComponent, {
      width: '634px',
      data: {'id':this.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }


  submit() {
    console.log(this.reponseAdd.feedbackDTO);
    this.reponseAdd.feedbackDTO.idFeedback = this.id;
    this.reponseAdd.employe.id = JSON.parse(localStorage.getItem('currentUser')).personnelId;
    this.reponseAdd.reponse = this.name;
    this.reponseSevice.addReponse(this.reponseAdd).subscribe(x => {
      this.reponseAdd = x;
      this.reponseAdd = new ReponseDTO();
      if(this.id!=undefined) {
      this.reponseSevice.getReponseByIdFeedback(this.id).subscribe(x => {
        this.reponse = x;
        let data = JSON.stringify({
          'name': this.name,
        })
        this.ws.send("/app/message", {}, data);
        //this.reponseAdd = new ReponseDTO();
        this.name="";
      });
      }
    });
  }
setAnomalieResolu(id:number){
    this.feedbackService.SetEtatAnomalieResolu(id).subscribe(x=> {
      this.resolu = x;
      this.ngOnChanges();
    });
}
  ngOnChanges() {
    if(this.id!=undefined) {
      this.feedbackService.AffectationByFeedback(this.id).subscribe(listeAffectation => {this.affectationsList = listeAffectation;
        console.log("",this.id);
        this.ready=true;

      });

      this.feedbackService.getFeedbackById(this.id).subscribe(x => {

        this.feedbackDetail = x;

        this.ready=true;
      });
      this.reponseSevice.getReponseByIdFeedback(this.id).subscribe(x => {
        this.reponse = x;
        this.ready=true;

      });
    }
  }

  refreshPage() {
    this.testRep.emit(true);
  }

  refrech(event) {
    if (event == true) {

      this.test = event;


    }
  }
  getAffectationByFeedback() {
    if(this.id!=undefined){
    this.feedbackService.AffectationByFeedback(this.id).subscribe(listeAffectation => {this.affectationsList = listeAffectation;

    });}
  }
  repRef(event) {
    this.rep = event;
    this.reponse.push(event);

  }
}
