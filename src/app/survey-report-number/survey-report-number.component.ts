import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { EnqueteService } from '../services/enquete.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-survey-report-number',
  templateUrl: './survey-report-number.component.html',
  styleUrls: ['./survey-report-number.component.css']
})
export class SurveyReportNumberComponent implements OnInit {
  @Input() index;
  min: Number;
  max: Number;
  average: Number;

  constructor(private enqueteService: EnqueteService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private elementRef: ElementRef) { }

  ngOnInit() {
    this.enqueteService.getReport(+this.route.snapshot.paramMap.get('id'), this.authService.getLoggedInUser().id)
      .subscribe(res => {
        this.min = res[this.index].min;
        this.max = res[this.index].max;
        this.average = res[this.index].average;
      });
  }

}
