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
<<<<<<< HEAD
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
=======
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ChangeDetectorRef } from '@angular/core';


/*export class MyErrorStateMatcher implements ErrorStateMatcher {
>>>>>>> simpleQuestions
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
<<<<<<< HEAD
}
=======
}*/
>>>>>>> simpleQuestions

@Component({
  selector: 'app-form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.css'],
})

export class FormRendererComponent implements OnInit {
<<<<<<< HEAD
  requiredFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();
=======

  requiredFormControl: FormControl[] = [];
>>>>>>> simpleQuestions

  enquete$: Observable<Enquete>;
  surveyResponse: SurveyResponse;
  allResponses$: Observable<SurveyResponse[]>;
  myResponse$: Observable<SurveyResponse>;

  constructor(
    private route: ActivatedRoute,
    private enqueteService: EnqueteService,
<<<<<<< HEAD
    private authService: AuthService
=======
    private authService: AuthService,
    private cdRef: ChangeDetectorRef
>>>>>>> simpleQuestions
  ) { }

  ngOnInit() {
    this.getSurvey();
    this.getAllResponses();
    this.getMyResponses();
    this.surveyResponse = new SurveyResponse();
    this.surveyResponse.surveyId = +this.route.snapshot.paramMap.get('id');
    this.enquete$.subscribe(enquete => {
      for (var i = 0; i < enquete.questions.length; i++) {
<<<<<<< HEAD
        //this.surveyResponse.responses[i].questionId = enquete.questions[i].id;
=======
>>>>>>> simpleQuestions
        if (enquete.questions[i].type === "QTextEntity" || enquete.questions[i].type === "QMultChoices") {
          let response = new ResponseSingleValue();
          response.questionId = enquete.questions[i].id;
          this.surveyResponse.responses.push(response);
        }
<<<<<<< HEAD
=======

        if (enquete.questions[i].required === true /*&& enquete.questions[i].type === "QTextEntity"*/) {
          this.requiredFormControl.push(new FormControl('', [
            Validators.required
          ]));
        }
        else {
          this.requiredFormControl.push(new FormControl());
        }

>>>>>>> simpleQuestions
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

<<<<<<< HEAD
  /*ok(myResponse: SurveyResponse){
    console.log(myResponse);
  }*/
=======
  isValidForm(): Boolean {
    /*for (var i = 0; i < this.requiredFormControl.length; i++) {
      if (this.requiredFormControl[i].hasError('required') === true) {
        return false;
      }
    }
    return true;*/
    return !this.requiredFormControl.some(x => x.hasError('required'));
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
>>>>>>> simpleQuestions
}
