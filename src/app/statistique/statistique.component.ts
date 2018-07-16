import {Component, OnInit} from '@angular/core';
import {StatService} from './stat.service';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css'],
  providers: [StatService]
})
export class StatistiqueComponent implements OnInit {
  public barChartOptions: any = {

    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }

  };

  public piechartoptions:any={


};
  barchartAno=false;
  nbANomalie: number;
  nbProposition: number;
  public pieChartLabels: string[] = ['PROPOSITION', 'ANOMALIE'];
  public pieChartData: number[] = [0, 0];
  // lineChart
  public barChartLegend: boolean = true;
  public lineChartData: Array<any> = [{data:[0] , label : 'Anomalie'}];
  public lineChartLabels: Array<any> = [];
  public lineChartType: string = 'bar';
  public pieChartType: string = 'pie';
  public data2 = [];
  public chartColors: any[] = [
    {
      backgroundColor: ['#6f6f6f', '#ce5252']
    }];

  public chartColorsbar: any[] = [
    {
      backgroundColor: ['#ce5252', '#ce5252' , '#ce5252' , '#ce5252']
    }
    ];

  public barChartLabels:any[] =[];
  public barChartType:string = 'bar';


  public barChartData:any[] = [
    {data:[]}


  ];


  constructor(private statS: StatService) {

  }

  refresh() {
    this.getStatProposition();

  }

  ngOnInit() {
    this.getStatProposition();
    this.getKey();
    this.getAnomalieValue();
    this.statS.loadAnomalieValue().subscribe(k => {

        this.statS.loadKey().subscribe(k => {
            this.barChartLabels = k;
          }
        );
        this.barChartData = [

          {data:[],label:'anomalie'}


        ];
        this.barChartData[0].data = k;
      }
    );
  }

  getKey() {

  }

  getAnomalieValue() {
 /*   this.statS.loadAnomalieValue().subscribe(k => {
      this.barChartData = k;

      }
    );*/
  }

/*  getPropositionValue() {
    this.statS.loadStatProposition().subscribe(k => {
        this.barChartData[1].data = k;

      }
    );
  }*/
  getStatProposition() {

    this.statS.loadStatProposition().subscribe(nb => {
        if (nb == null) {
          console.log('no data');

        } else {
          this.data2 = nb;
          this.pieChartData = this.data2;
          this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
          this.pieChartType = this.pieChartType === 'polarArea' ? 'pie' : 'polarArea';

        }


      }
    );
  }

  // Pie

  public randomizeType(): void {

    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    this.pieChartType = this.pieChartType === 'polarArea' ? 'pie' : 'polarArea';

  }

  public chartClicked(e: any): void {

console.log(e.item);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public chartClicked1(evt,index2,test):void {
    if (evt.active.length > 0) {
      const chart = evt.active[0]._chart;
      const activePoints = chart.getElementAtEvent(evt.event);
      if (activePoints.length > 0) {
// get the internal index of slice in pie chart
        const clickedElementIndex = activePoints[0]._index;
        const label = chart.data.labels[clickedElementIndex];
// get value by index
        const value = chart.data.datasets[0].data[clickedElementIndex];
        console.log(label);
        // this.getActionBetweenDates1(evt,index2,label);
        // this.getActionBetweenDates2(evt,index2,label);

if(label=='ANOMALIE'){
  this.barchartAno=true;
  console.log(this.barchartAno);
}
        if(label=='ANOMALIE'){
          this.chartColorsbar=[{
            backgroundColor: ['#ce5252', '#ce5252' , '#ce5252' , '#ce5252']
          }];
          this.statS.loadAnomalieValue().subscribe(k => {

            this.statS.loadKey().subscribe(k => {
                this.barChartLabels = k;
              }
            );
           this.barChartData = [

              {data:[],label:'anomalie'}


            ];
            this.barChartData[0].data = k;
            }
          );
        } else if (label=='PROPOSITION'){
          this.chartColorsbar=[{
            backgroundColor: ['#6f6f6f', '#6f6f6f' , '#6f6f6f' , '#6f6f6f']
          }];
          this.statS.loadKeyProp().subscribe(k => {
              this.barChartLabels = k;
            }
          );
          this.statS.loadPropositionValue().subscribe(k => {

            this.barChartData = [
              {data:[],label:'proposition'}


            ];
            this.barChartData[0].data = k;
            }
          );
        }
      }
    }
  }


}
