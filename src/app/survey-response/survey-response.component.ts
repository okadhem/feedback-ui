import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Enquete } from '../enquete';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EnqueteService } from '../services/enquete.service';
import { AuthService } from '../services/auth.service';
import { switchMap } from 'rxjs/operators';
import { SurveyResponse } from '../surveyResponse';

@Component({
  selector: 'app-survey-response',
  templateUrl: './survey-response.component.html',
  styleUrls: ['./survey-response.component.css']
})
export class SurveyResponseComponent implements OnInit {

  allResponses$: Observable<SurveyResponse[]>;
  response: SurveyResponse;
  enquete$: Observable<Enquete>;
  index: Number;

  constructor(private route: ActivatedRoute,
    private enqueteService: EnqueteService,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.index = +params['index']);
    this.getAllResponses();
    this.getSurvey();
  }

  getAllResponses() {
    this.allResponses$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.enqueteService.getAllResponses(+params.get('id_survey'), this.authService.getLoggedInUser().id))
    );

  }

  getSurvey() {
    this.enquete$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.enqueteService.getSurvey(+params.get('id_survey'), this.authService.getLoggedInUser().id))
    );
  }

  shouldBeChecked(tab: String[], option: String): Boolean {
    return !(tab.indexOf(option) === -1);
  }

}
