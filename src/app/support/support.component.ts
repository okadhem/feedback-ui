import { Component, OnInit } from '@angular/core';
import {FeedbackService} from '../feedback/feedback.service';
import {LoginService} from '../login/login.service';
import {AvisService} from '../avis/avis.service';
import {Feedback} from '../feedback/Feedback';
import {ThemeAvis} from '../avis/ThemeAvis';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
  providers:[FeedbackService,AvisService]
})
export class SupportComponent implements OnInit {
feedbackTest:boolean=true;
mesFeed:boolean=false;
  theme:boolean=false;
    feedbacks:Feedback[]=[];
    mesFeedback:Feedback[]=[];
    themes: ThemeAvis[]=[];
  publicfeed=false;

  constructor(private feedbackService:FeedbackService, private loginService: LoginService, private avisService: AvisService) { }

  ngOnInit() {
    this.feedbackService.getAllFeedback().subscribe(x=>{
      this.feedbacks=x;
    });

    this.feedbackService.LoadMyFeedbacks(JSON.parse(localStorage.getItem('currentUser')).personnelId).subscribe(x=>{
      this.mesFeedback=x;
    });

    this.avisService.LoadAllThemes1().subscribe(x=>{
      this.themes=x;
    })
  }
feedbacksClik(){
    this.feedbackTest=true;
  this.theme=false;
    this.mesFeed=false;
  this.publicfeed=false;
}
mesfeedbacktest(){
  this.feedbackTest=false;
  this.theme=false;
  this.mesFeed=true;
  this.publicfeed=false;
}
  avisclick(){
    this.feedbackTest=false;
    this.mesFeed=false;
    this.theme=true;
    this.publicfeed=false;
  }

  feedbackpub() {
    this.feedbackTest=false;
    this.mesFeed=false;
    this.theme=false;
    this.publicfeed=true;
  }
}
