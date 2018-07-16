import {Component, DoCheck, OnInit} from '@angular/core';
import {FeedbackService} from '../feedback.service';
import {Feedback} from '../Feedback';
import {FeedbackFile} from '../FeedbackFile';
import {DataService} from '../../websocket/data.service';
import {ReponseService} from '../../reponse/reponse.service';
import {RepFeedback} from '../../Model/ReponseFeedback';

@Component({
  selector: 'app-feedback-publiques',
  templateUrl: './feedback-publiques.component.html',
  styleUrls: ['./feedback-publiques.component.css'],
  providers:[FeedbackService,ReponseService]
})
export class FeedbackPubliquesComponent implements OnInit,DoCheck {



  ngDoCheck(): void {
    if(this.updatePub){
      this.ready=false;
      this.getPublicFeedbacks();
    }
    this.dataService.changeUpdateFeedbackPub(false);

  }

  repFeedback:RepFeedback[]=[];
  showw:boolean[];
  FeedbacksPublic:Feedback[]=[];
  feedbackFile:FeedbackFile[]=[];
  dtOptions: any = {};
  idfeed : number;
  idFeedbackFile: number[]=[];
  checkSameValue;
  updatePub:boolean;
  ready:boolean=true;
  nbrep:number=0;
feedWithRep: number[]=[];

  constructor(private FeedbackService:FeedbackService, private dataService:DataService ,  private reponseService : ReponseService
  ) { }
  getNbrRep(){
    this.reponseService.getNbrRep().subscribe(x=>{
      this.repFeedback=x;

    })
  }
  ngOnInit() {
    this.getNbrRep();
    this.getPublicFeedbacks();

    this.dtOptions = {
      paging: false,
      bInfo:false,


    };

    this.FeedbackService.getAllFile().subscribe(x=>{
      this.feedbackFile=x;}
    );

    this.FeedbackService.feedbackWithFile().subscribe(x=>{
      this.idFeedbackFile=x;
    });

    this.dataService.currentUpdateFeedbackPub.subscribe(x=>{
      this.updatePub=x;
    })
    this.reponseService.feedbackPublicWithResponse().subscribe(x => {
      this.feedWithRep = x;
    });


  }
  getPublicFeedbacks() {
    this.FeedbackService.LoadPublicFeedbacks().subscribe(
        Feedbacks => {
        this.ready=true;
        this.FeedbacksPublic = Feedbacks;
        this.showw = new Array();
        for (var i = 0; i < this.FeedbacksPublic.length; i++) {
          this.showw.push(false);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  show(i:number){
    this.showw[i]=true;
  }

  dontshow(i) {
    this.showw[i]=false;
  }

  tableEvent(item){
    console.log("id dans feedback publique", item.idFeedback);

    this.idfeed = item.idFeedback;
  }
  reloadTab(event) {

    if (event === true) {
      this.ngOnInit();
    }

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

  displayCondition(checkValue, elementValue):boolean {
    if(this.checkSameValue && this.checkSameValue == checkValue) {
      return false;
    }
    if(checkValue == elementValue) {
      this.checkSameValue = checkValue;
      return true;
    }
  }

test(){
    console.log("test test rep")
}


}
