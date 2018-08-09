import { Component, OnInit, ComponentRef } from '@angular/core';
import { QNumber } from '../qNumber';

@Component({
  selector: 'app-qnumber',
  templateUrl: './qnumber.component.html',
  styleUrls: ['./qnumber.component.css']
})
export class QnumberComponent implements OnInit {
  question: QNumber;
  compRef: ComponentRef<QnumberComponent>;
  isAlive: Boolean;

  constructor() { }

  ngOnInit() {
    this.isAlive = true;
  }

  destroy() {
    this.compRef.destroy();
    this.isAlive = false;
  }

}
