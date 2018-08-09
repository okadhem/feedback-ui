import { Component, OnInit, ComponentRef } from '@angular/core';
import { QCheckbox } from '../qCheckbox';

@Component({
  selector: 'app-qcheckbox',
  templateUrl: './qcheckbox.component.html',
  styleUrls: ['./qcheckbox.component.css']
})
export class QcheckboxComponent implements OnInit {

  question: QCheckbox;

  compRef: ComponentRef<QcheckboxComponent>;
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

  destroy() {
    this.compRef.destroy();
    this.isAlive = false;
  }

}
