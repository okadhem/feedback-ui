import {Component, DoCheck, OnInit} from '@angular/core';
import {CategorieService} from '../../categorie/categorie.service';
import {FeedbackService} from '../feedback.service';
import {Categorie} from '../../categorie/Categorie';
import {Feedback} from '../Feedback';
import {MatChipsModule} from '@angular/material';
import {LoginService} from '../../login/login.service';
import {FeedbackFile} from '../FeedbackFile';
import {DataService} from '../../websocket/data.service';
import {ReponseService} from '../../reponse/reponse.service';
import {RepFeedback} from '../../Model/ReponseFeedback';

@Component({
  selector: 'app-mes-feedbacks',
  templateUrl: './mes-feedbacks.component.html',
  styleUrls: ['./mes-feedbacks.component.css'],
  providers: [CategorieService, FeedbackService,ReponseService]
})
export class MesFeedbacksComponent implements OnInit,DoCheck {


  ngDoCheck(): void {

    if(this.updateMesFeedback){
      this.readyMesFeedback=false;
      this.getMesFeedbacks();

    }
    this.dataService.changeUpdateMesFeedback(false);
  }


  load=true;
  showw:boolean[];
  public Feedbacks: Feedback[] = [];
  public FeedbacksPublic: Feedback[] = [];
  dtOptions: any = {};
  count: number;
  nbANomalie:number;
  nbProposition:number;
  id: number;
  idFeedbackFile: number[]=[];
  feedbackFile:FeedbackFile[]=[];
  updateMesFeedback : boolean
  readyMesFeedback :boolean=true;
  repFeedback:RepFeedback[]=[];
feedWithRep: number[]=[];
  constructor(private FeedbackService: FeedbackService,private LoginService : LoginService, private dataService: DataService , private reponseService : ReponseService
  ) {
    this.count = this.Feedbacks.length;
  }

  ngOnInit() {
    this.getMesFeedbacks();

    this.dtOptions = {
      paging: false,
      bInfo:false,


    };
    this.getNbAnomalie();
    this.getNbProposition();
    this.getNbrRep();
    this.FeedbackService.feedbackWithFile().subscribe(x=>{
      this.idFeedbackFile=x;
    });
    this.FeedbackService.getAllFile().subscribe(x=>{
      this.feedbackFile=x;}
    );

    this.dataService.currentUpdateMesFeedback.subscribe(x=>{
      this.updateMesFeedback=x;
    });

    this.reponseService.feedbackPersonelWithResponse(JSON.parse(localStorage.getItem('currentUser')).personnelId).subscribe(x => {
      this.feedWithRep = x;
    });

  }
  getNbrRep(){
    this.reponseService.getNbrRep().subscribe(x=>{
      this.repFeedback=x;

    })
  }
  getMesFeedbacks() {
    this.FeedbackService.LoadMyFeedbacks(JSON.parse(localStorage.getItem('currentUser')).personnelId).subscribe(
      Feedbacks => {
        this.load=false;
        this.readyMesFeedback=true;
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
  reloadTab(event) {

    if (event === true) {
      this.ngOnInit();
    }

  }
  getNbAnomalie(){
    this.FeedbackService.loadNbAnomalie(JSON.parse(localStorage.getItem('currentUser')).personnelId).subscribe(nb=>
      {
        if(nb== null){
          this.nbANomalie=0;
        }else{
          this.nbANomalie=nb;
        }
      }
    );
  }
  getNbProposition(){

    this.FeedbackService.loadNbProposition(JSON.parse(localStorage.getItem('currentUser')).personnelId).subscribe(nb=>{
        if(nb== null){
          this.nbProposition=0;
        }else{
          this.nbProposition=nb;
        }

      }
    );
  }

  tableEvent(item){



    this.id = item.idFeedback;
  }

  fileCondition(id:number):boolean{
    let test:boolean =false;
    for(var i=0; i< this.idFeedbackFile.length; i++){
      if(id == this.idFeedbackFile[i]){
        test= true;
      }


    }
    return test;
  }
  show(i:number){
    this.showw[i]=true;
  }

  dontshow(i) {
    this.showw[i]=false;
  }


}
