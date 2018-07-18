import { Component, OnInit } from '@angular/core';
import { Tqcm } from '../tqcm';

@Component({
  selector: 'app-qcm',
  templateUrl: './qcm.component.html',
  styleUrls: ['./qcm.component.css']
})
export class QcmComponent implements OnInit {
  options: Array<String> = [];
  constructor() { }

  ngOnInit() {
  }

  addOption() {
    const length = this.options.length + 1;
    this.options.push("Option " + length);
  }

  deleteOption(index: any) {
    this.options.splice(index ,1);
  }

  trackByFn(index: any, item: any) {
    return index;
  }

}
