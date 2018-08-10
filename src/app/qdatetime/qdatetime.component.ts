import { Component, OnInit, ComponentRef } from '@angular/core';
import { QDateTime } from '../qDateTime';

@Component({
  selector: 'app-qdatetime',
  templateUrl: './qdatetime.component.html',
  styleUrls: ['./qdatetime.component.css']
})
export class QdatetimeComponent implements OnInit {

  question: QDateTime;
  compRef: ComponentRef<QdatetimeComponent>;
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
