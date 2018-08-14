import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import * as Chart from 'chart.js';
import { EnqueteService } from '../services/enquete.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Enquete } from '../enquete';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-survey-report',
  templateUrl: './survey-report.component.html',
  styleUrls: ['./survey-report.component.css']
})
export class SurveyReportComponent implements OnInit {

  enquete$: Observable<Enquete>;
  /*@ViewChild('myCanvas') myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;
  chart: any;*/

  constructor(private enqueteService: EnqueteService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private elementRef: ElementRef) { }

  ngOnInit() {
    this.getSurvey();
    /*this.enqueteService.getReport(+this.route.snapshot.paramMap.get('id'), this.authService.getLoggedInUser().id)
      .subscribe(res => {

        for (var i = 0; i < this.enquete.questions.length; i++) {
          let labels = [];
          let data = [];
          for (let choice in res[i].choices) {
            labels.push(choice);
            data.push(res[i].choices[choice]);
          }
          this.labelsArray.push(labels);
          this.dataArray.push(data);
        }
      })*/
  }

  getSurvey() {
    this.enquete$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.enqueteService.getSurvey(+params.get('id'), this.authService.getLoggedInUser().id))
    );
  }

  /*ngAfterViewInit() {
    let colors = ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D',
      '#92A8CD', '#A47D7C', '#B5CA92', '#B74134', '#CD6657', '#3E3637', '#9B5D4E',
      '#CDCECD'];

    this.enqueteService.getReport(+this.route.snapshot.paramMap.get('id'), this.authService.getLoggedInUser().id)
      .subscribe(res => {

        this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
        let labels = [];
        let data = [];

        for (let choice in res[2].choices) {
          labels.push(choice);
          data.push(res[2].choices[choice]);
        }

        this.chart = new Chart(this.context, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Personnes',
                backgroundColor: this.shuffleInPlace(colors),
                data: data
              }
            ]
          },
          options: {
            title: {
              display: true,
              text: 'Predicted world population (millions) in 2050'
            },
            scales: {
              yAxes: [{
                ticks: <Chart.LinearTickOptions>{
                  beginAtZero: true,
                  suggestedMax: 6
                }
              }]
            }
          }
        });
      })
  }

  shuffleInPlace(array: string[]): string[] {
    // if it's 1 or 0 items, just return
    if (array.length <= 1) return array;

    // For each index in array
    for (let i = 0; i < array.length; i++) {

      // choose a random not-yet-placed item to place there
      // must be an item AFTER the current item, because the stuff
      // before has all already been placed
      const randomChoiceIndex = this.getRandom(i, array.length - 1);

      // place our random choice in the spot by swapping
      [array[i], array[randomChoiceIndex]] = [array[randomChoiceIndex], array[i]];
    }

    return array;
  }

  getRandom(floor: number, ceiling: number) {
    return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
  }*/

}

