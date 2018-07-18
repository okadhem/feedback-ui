import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Question, Qtype } from '../question';
import { QcmComponent } from '../qcm/qcm.component';
import { QtextComponent } from '../qtext/qtext.component';


@Component({
  selector: 'app-form-creator',
  templateUrl: './form-creator.component.html',
  styleUrls: ['./form-creator.component.css']
})
export class FormCreatorComponent implements OnInit {
  //questions: Question[] = [];
  @ViewChild('dynamic', {
    read: ViewContainerRef
  }) viewContainerRef: ViewContainerRef

  constructor(private factoryResolver: ComponentFactoryResolver) { }
  ngOnInit() {
    //this.questions.push({ qtype: Qtype.QTEXT, label: 'hello', QCM_choices: [] });
  }

  /*add() {
    //this.questions.push({ qtype: Qtype.QTEXT, label: '', QCM_choices: [] })
  }*/

  addQtext(){
    let factory = this.factoryResolver.resolveComponentFactory(QtextComponent);
    let compRef = this.viewContainerRef.createComponent(factory);
  }
  addQcm(){
    let factory = this.factoryResolver.resolveComponentFactory(QcmComponent);
    let compRef = this.viewContainerRef.createComponent(factory);
  }

}
