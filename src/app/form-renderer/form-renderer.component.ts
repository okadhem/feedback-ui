import { Component, OnInit } from '@angular/core';
import { Enquete } from '../enquete';
import { EnqueteService } from '../services/enquete.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.css']
})
export class FormRendererComponent implements OnInit {
  enquete$: Observable<Enquete>;
  constructor(
    private route: ActivatedRoute,
    private enqueteService: EnqueteService
  ) { }

  ngOnInit() {
    this.getSurvey();
  }

  getSurvey() {
    this.enquete$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.enqueteService.getSurvey(+params.get('id')))
    );
  }

}
