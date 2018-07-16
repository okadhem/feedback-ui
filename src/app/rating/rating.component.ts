import {Component, OnInit} from '@angular/core';
import {NgModule, EventEmitter, Input, Output} from '@angular/core';
import { CategorieListComponent } from '../categorie/categorie-list/categorie-list.component';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  score1:number;
  @Output() messageEvent = new EventEmitter<number>();
  @Input() score: any;
  @Input() maxScore = 5;
  @Input() forDisplay = false;
  @Output() rateChanged = new EventEmitter();

  range: any = [];
  marked = -1;

  constructor() {
  }

  ngOnInit() {
    for (var i = 0; i < this.maxScore; i++) {
      this.range.push(i);
    }
  }
public getScore(n:number){
    this.score1=n;
  this.messageEvent.emit(this.score1);
}
  public mark = (index: any) => {
    this.marked = this.marked === index ? index - 1 : index;
    this.score = this.marked + 1;
    this.rateChanged.next(this.score);
  };

  public isMarked = (index: any) => {
    if (!this.forDisplay) {
      if (index <= this.marked) {
        return 'fa-star';
      }
      else {
        return 'fa-star-o';
      }
    }
    else {
      if (this.score >= index + 1) {
        return 'fa-star';
      }
      else if (this.score > index && this.score < index + 1) {
        return 'fa-star-half-o';
      }
      else {
        return 'fa-star-o';
      }
    }
  };

}
