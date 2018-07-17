import { Component, OnInit } from '@angular/core';
import { Question, Qtype } from '../question';

@Component({
  selector: 'app-form-creator',
  templateUrl: './form-creator.component.html',
  styleUrls: ['./form-creator.component.css']
})
export class FormCreatorComponent implements OnInit {
  questions: Question[] = [];
  constructor() { }

  ngOnInit() {
    this.questions.push({ qtype: Qtype.QTEXT, label: 'hello', QCM_choices: [] });
  }

  add() {
    this.questions.push({ qtype: Qtype.QTEXT, label: '', QCM_choices: [] })
  }
}
