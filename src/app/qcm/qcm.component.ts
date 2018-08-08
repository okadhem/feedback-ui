import { Component, OnInit, Input,ComponentRef } from '@angular/core';
import { QChoixMultiples } from '../qChoixMultiples';

@Component({
  selector: 'app-qcm',
  templateUrl: './qcm.component.html',
  styleUrls: ['./qcm.component.css']
})
export class QcmComponent implements OnInit {
  question: QChoixMultiples;
  compRef: ComponentRef<QcmComponent>;
  isAlive: Boolean;
  
  constructor() {
  }

  ngOnInit() {
      this.isAlive = true;
  }

  addOption() {
    const length = this.question.choices.length + 1;
    this.question.choices.push("Option " + length);
  }

  deleteOption(index: any) {
    this.question.choices.splice(index, 1);
    console.log(this.question.label);
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  destroy()
  {
      this.compRef.destroy();
      this.isAlive = false;
  }
}

