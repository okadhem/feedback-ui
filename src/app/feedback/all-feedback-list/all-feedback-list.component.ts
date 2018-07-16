import {AfterViewInit, Component, DoCheck, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FeedbackService} from '../feedback.service';
import {Feedback} from '../Feedback';
import {ReponseService} from '../../reponse/reponse.service';
import {FeedbackFile} from '../FeedbackFile';
import {PersonnesConcerneeComponent} from '../../personnes-concernee/personnes-concernee.component';
import {MatDialog} from '@angular/material';
import {Affectation} from '../../personnes-concernee/Affectation';
import {ReponseDTO} from '../../reponse/Reponse';
import {DataService} from '../../websocket/data.service';
import {RepFeedback} from '../../Model/ReponseFeedback';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';
import {DataTableDirective} from 'angular-datatables';
import { Subject } from 'rxjs';
declare var swal: any;

//declare var swal: any;
@Component({
  selector: 'app-all-feedback-list',
  templateUrl: './all-feedback-list.component.html',
  styleUrls: ['./all-feedback-list.component.css'],
  providers: [FeedbackService, ReponseService]
})
export class AllFeedbackListComponent implements AfterViewInit, OnDestroy, OnInit , DoCheck {

  repFeedback:RepFeedback[]=[];

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;


  dtTrigger: Subject<any> = new Subject();
  ngDoCheck(): void {
    if (this.update) {
      this.ready=false;
      this.getAllFeedbacks();
    }
    this.dataService.changeUpdateAllFeedback(false);
  }

setAnomalie : boolean;
  setAnomalie2:boolean;
  setAnomalieResolu:boolean;
  setEtatProposition:boolean;
  load=true;
  deleteAffectation:boolean;
  tableofNames:string[]=[];
  letPersonnes:boolean=false;
  showw:boolean[];
  reponse: ReponseDTO[] = [];
  Feedbacks: Feedback[] = [];
  feedbackFile: FeedbackFile[] = [];
  dtOptions: any = {};
  id:number;
  public affectationsList: Affectation[] = [];
  idFeedback: number[] = [];
  idFeedbackFile: number[] = [];
  checkSameValue;
  privateFeedback:Feedback;
  set:boolean;
  update : boolean;
  ready:boolean=true;
  updateWorkflow1:boolean;
  setEtatPropositionRevoir:boolean;
  today = new Date();
  nbFeedbackTraite:number;
  ws: any;
  constructor(private FeedbackService: FeedbackService, private reponseSevice: ReponseService, public dialog: MatDialog, private dataService: DataService
  ) {
/*
    let socket = new WebSocket("ws://localhost:8087/greeting");
    this.ws = SAfterViewInit, OnDestroy,tomp.over(socket);
*/
  }
showPersonnes(){

    this.letPersonnes=true;
}
  ngOnInit() {
    this.getNBFeedbackTraite();
    this.dataService.currentUpdateWorkflow.subscribe(update=>this.updateWorkflow1=update);
    this.getAllFeedbacks();
    this.dtOptions = {
      paging: false,
      bInfo: false


    };

    this.getNbrRep();
    this.FeedbackService.getAllFile().subscribe(x => {
        this.feedbackFile = x;
      }
    );

    this.reponseSevice.feedbackWithResponse().subscribe(x => {
      this.idFeedback = x;
    });

    this.FeedbackService.feedbackWithFile().subscribe(x => {
      this.idFeedbackFile = x;
    });


    this.dataService.currentUpadteAllFeedback.subscribe(x=> {this.update=x;

    });



  }

  getNBFeedbackTraite(){
    this.FeedbackService.getNBFeedbackTraite().subscribe(nb=>
    this.nbFeedbackTraite = nb
    )
}
showDate(f:Feedback){
    if((this.today.getDate() - (new Date(f.dateCreation)).getDate()==1 || this.today.getDate() - (new Date(f.dateCreation)).getDate()==0)  && this.today.getMonth() == (new Date(f.dateCreation)).getMonth() && this.today.getFullYear() == (new Date(f.dateCreation)).getFullYear() ){


      return true ;

    } else {

      return false;
    }
}
  getNbrRep(){
    this.reponseSevice.getNbrRep().subscribe(x=>{
      this.repFeedback=x;

    })
  }


  getAllFeedbacks() {
    this.FeedbackService.getAllFeedback().subscribe(
      Feedbacks => {
        this.load=false;
        this.ready=true;
        this.Feedbacks = Feedbacks;
        this.showw = new Array();
        for (var i = 0; i < this.Feedbacks.length; i++) {
         this.showw.push(false);
          }
      },
      err => {
        console.log(err);
      }
    );
  }

  tableEvent(item) {


    this.id = item.idFeedback;

  }

  displayCondition(id: number): boolean {
    let test: boolean = false;
    for (var i = 0; i < this.idFeedback.length; i++) {
      if (id == this.idFeedback[i]) {
        test = true;
      }
    }
    return test;
  }

  fileCondition(id: number): boolean {
    let test: boolean = false;
    for (var i = 0; i < this.idFeedbackFile.length; i++) {
      if (id == this.idFeedbackFile[i]) {
        test = true;
      }


    }
    return test;

  }

  reloadTab(event) {

    if (event === true) {
      this.ngOnInit();
    }

  }

  openDialog(id:number): void {

    let dialogRef = this.dialog.open(PersonnesConcerneeComponent, {
      width: '634px',
      height: '200px' ,
      data: {'id': id , 'namesT' : this.tableofNames}
    });
    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed');

    });
  }

  getAffectationByFeedback(id:number) {
    this.FeedbackService.AffectationByFeedback(id).subscribe(listeAffectation => {this.affectationsList = listeAffectation;
      this.tableofNames=this.affectationsList.map(value => value.employee.firstName);


    });
  }



  getNombreReponse(id:number){

    this.reponseSevice.getReponseByIdFeedback(id).subscribe(x => {
      this.reponse = x;


    });
  }

  show(i:number){
    this.showw[i]=true;
  }

  dontshow(i) {
    this.showw[i]=false;
  }

  SetEtatProposition(id:number){

    this.FeedbackService.SetEtatProposition(id).subscribe(setEtatProposition=>{
      this.setEtatProposition=setEtatProposition;
      this.dataService.changeUpdateWorkflow(true);
      this.showAlert1();
      this.ngOnInit();

    })
  }
  SetEtatAnomalie(id:number){
 console.log("test anissa de l'etat anomalie")
    this.FeedbackService.SetEtatAnomalie(id).subscribe(setEtat=>{
      this.setAnomalie=setEtat;
      this.dataService.changeUpdateWorkflow(true);
      swal(
        'Ce Feedback est confirmer en tant qu anomalie !',
        '',
        'success',
      );

      this.ngOnInit();

    })
    let workflowUpdate = JSON.stringify({
      'testWorkflow': true
    });
 console.log("tets update work work")
    this.ws.send('/app/workflow', {}, workflowUpdate);

  }

  SetEtatAnomalie2(id:number){

    this.FeedbackService.SetEtatAnomalie2(id).subscribe(setEtat=>{
      this.setAnomalie2=setEtat;
      this.dataService.changeUpdateWorkflow(true);
      swal(
        'Ce Feedback est non confirmer en tant qu anomalie !',
        '',
        'success',
      );
      this.ngOnInit();

    })
  }
  SetEtatAnomalieResolu(id:number){

    this.FeedbackService.SetEtatAnomalieResolu(id).subscribe(setEtat=>{
      this.setAnomalieResolu=setEtat;
      this.dataService.changeUpdateWorkflow(true);
      swal(
        'Cet Anomalie est Résolu  !',
        '',
        'success',
      );
      this.ngOnInit();

    })
  }
  SetEtatPropositionRevoir(id:number){

    this.FeedbackService.SetEtatPropositionRevoir(id).subscribe(setEtatPropositionRevoir=>{
      this.setEtatPropositionRevoir=setEtatPropositionRevoir;
      this.dataService.changeUpdateWorkflow(true);
        swal(
          'Ce Feedback est à Revoir !',
          '',
          'success',
        );
      this.ngOnInit();

    })
  }

  changeVisibility(id:number){

    this.FeedbackService.setVisibility(id).subscribe(setVisibility=>{
      this.set=setVisibility;
      this.ngOnInit();
        });

  }

  showAlert1() {

    swal(
      'Ce Feedback est à Retenir !',
      '',
      'success',
    );

  }
  DeleteAffectation(id:number , id1: number){
    this.FeedbackService.DeleteAffectation(id , id1 ).subscribe(deleted=> {
      this.deleteAffectation = deleted;

      this.getAffectationByFeedback(id);
    })
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
}
