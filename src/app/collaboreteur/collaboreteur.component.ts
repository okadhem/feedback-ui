import { Component, OnInit } from '@angular/core';
import {AvisService} from '../avis/avis.service';
import {FeedbackService} from '../feedback/feedback.service';
import {Feedback} from '../feedback/Feedback';
import {ThemeAvis} from '../avis/ThemeAvis';
import {LoginService} from '../login/login.service';

@Component({
  selector: 'app-collaboreteur',
  templateUrl: './collaboreteur.component.html',
  styleUrls: ['./collaboreteur.component.css'],
  providers:[AvisService,FeedbackService]
})

export class CollaboreteurComponent implements OnInit {
  feedbacksPublic: Feedback[] = [];
  mesFeedback: Feedback[] = [];
  themes1: ThemeAvis[] = [];
  publicfeed=false;
  mesFeed:boolean=false;
  theme:boolean=false;


  constructor(private feedbackService: FeedbackService, private loginService: LoginService, private avisService: AvisService) { }

  ngOnInit() {
    this.feedbackService.LoadPublicFeedbacks().subscribe(x => {
      this.feedbacksPublic = x;
    });

    this.feedbackService.LoadMyFeedbacks(JSON.parse(localStorage.getItem('currentUser')).personnelId).subscribe(x=>{
      this.mesFeedback=x;
    });


    this.avisService.LoadAllThemes1().subscribe(x => {
      this.themes1 = x;
    })
  }

  mesfeedbacktest(){

    this.theme=false;
    this.mesFeed=true;
    this.publicfeed=false;
  }
  avisclick(){

    this.mesFeed=false;
    this.theme=true;
    this.publicfeed=false;
  }

  feedbackpub() {

    this.mesFeed=false;
    this.theme=false;
    this.publicfeed=true;
  }

}
