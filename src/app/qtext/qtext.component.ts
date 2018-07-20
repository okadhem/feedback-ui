import { Component, OnInit } from '@angular/core';
import { QText } from '../qText';

@Component({
  selector: 'app-qtext',
  templateUrl: './qtext.component.html',
  styleUrls: ['./qtext.component.css']
})
export class QtextComponent implements OnInit {
  question: QText;

  constructor() { }

  ngOnInit() {
  }

}
