import { Component, OnInit, Input } from '@angular/core';
import { CloudData, CloudOptions, ZoomOnHoverOptions } from 'angular-tag-cloud-module';
import { EnqueteService } from '../services/enquete.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-survey-report-cloud',
  templateUrl: './survey-report-cloud.component.html',
  styleUrls: ['./survey-report-cloud.component.css']
})
export class SurveyReportCloudComponent implements OnInit {
  @Input() index;
  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value 
    width: 500,
    height: 200,
    overflow: false,
  }

  zoomOnHoverOptions: ZoomOnHoverOptions = {
    scale: 1.3, // Elements will become 130 % of current zize on hover
    transitionTime: 1, // it will take 1.2 seconds until the zoom level defined in scale property has been reached
    delay: 0 // Zoom will take affect after 0.8 seconds
  };

  data$: Observable<any>;
  data: CloudData[] = [];

  constructor(private enqueteService: EnqueteService,
    private authService: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getReport();
  }

  getReport() {
    this.data$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.enqueteService.getReport(+params.get('id'), this.authService.getLoggedInUser().id))
    );
    
    this.data$.subscribe(x => {

      for (let word in x[this.index].words) {
      this.data.push({ text: word, weight: x[this.index].words[word]*100 });
      }
    });
  }
}