import { Component, OnInit, HostBinding } from '@angular/core';
import { Enquete } from '../enquete';
import { EnqueteService } from '../services/enquete.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SurveyResponse } from '../surveyResponse';
import { Response } from '../response';
import { ResponseSingleValue } from '../responseSingleValue';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.css'],
})

export class FormRendererComponent implements OnInit {
  enquete$: Observable<Enquete>;
  surveyResponse: SurveyResponse;
  allResponses$: Observable<SurveyResponse[]>;
  myResponse$: Observable<SurveyResponse>;

  constructor(
    private route: ActivatedRoute,
    private enqueteService: EnqueteService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getSurvey();
    this.getAllResponses();
    this.getMyResponses();
    this.surveyResponse = new SurveyResponse();
    this.surveyResponse.surveyId = +this.route.snapshot.paramMap.get('id');
    this.enquete$.subscribe(enquete => {
      for (var i = 0; i < enquete.questions.length; i++) {
        //this.surveyResponse.responses[i].questionId = enquete.questions[i].id;
        if (enquete.questions[i].type === "QTextEntity" || enquete.questions[i].type === "QMultChoices") {
          let response = new ResponseSingleValue();
          response.questionId = enquete.questions[i].id;
          this.surveyResponse.responses.push(response);
        }
      }
    });
  }

  getSurvey() {
    this.enquete$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.enqueteService.getSurvey(+params.get('id'), this.authService.getLoggedInUser().id))
    );
  }

  getAllResponses() {
    this.allResponses$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.enqueteService.getAllResponses(+params.get('id'), this.authService.getLoggedInUser().id))
    );
  }

  getMyResponses() {
    this.myResponse$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.enqueteService.getMyResponse(+params.get('id'), this.authService.getLoggedInUser().id))
    );
  }

  envoyer() {
    this.enqueteService.addResponse(this.surveyResponse, this.authService.getLoggedInUser().id)
      .subscribe();
  }

  edit(myResponse: SurveyResponse) {
    this.enqueteService.addResponse(myResponse, this.authService.getLoggedInUser().id)
      .subscribe();
  }

  /*ok(myResponse: SurveyResponse){
    console.log(myResponse);
  }*/
}
