import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EnqueteService } from '../services/enquete.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { SurveyResponse } from '../surveyResponse';
import { switchMap } from 'rxjs/operators';
import { Enquete } from '../enquete';

@Component({
  selector: 'app-survey-response-list',
  templateUrl: './survey-response-list.component.html',
  styleUrls: ['./survey-response-list.component.css']
})
export class SurveyResponseListComponent implements OnInit {

  allResponses$: Observable<SurveyResponse[]>;
  enquete$: Observable<Enquete>;

  constructor(private route: ActivatedRoute,
    private enqueteService: EnqueteService,
    private authService: AuthService) { }

  ngOnInit() {
    this.getAllResponses();
    this.getSurvey();

  }

  getAllResponses() {
    this.allResponses$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.enqueteService.getAllResponses(+params.get('id'), this.authService.getLoggedInUser().id))
    );
  }

  getSurvey() {
    this.enquete$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.enqueteService.getSurvey(+params.get('id'), this.authService.getLoggedInUser().id))
    );
  }

}
