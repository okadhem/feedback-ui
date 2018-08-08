import { Component, OnInit,ComponentRef } from '@angular/core';
import { QText } from '../qText';

@Component({
  selector: 'app-qtext',
  templateUrl: './qtext.component.html',
  styleUrls: ['./qtext.component.css']
})
export class QtextComponent implements OnInit {
  question: QText; 
  compRef: ComponentRef<QtextComponent>; 
  isAlive: Boolean; 
  constructor() { }

  ngOnInit() {
      this.isAlive = true;
  }
  destroy()
  {
      this.compRef.destroy();
      this.isAlive = false;
  }

}
