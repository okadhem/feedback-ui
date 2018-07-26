import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { QcmComponent } from '../qcm/qcm.component';
import { QtextComponent } from '../qtext/qtext.component';
import { Enquete, Person } from '../enquete';
import { Question } from '../question';
import { QText } from '../qText';
import { QChoixMultiples } from '../qChoixMultiples';
import { EnqueteService } from '../services/enquete.service';


@Component({
  selector: 'app-form-creator',
  templateUrl: './form-creator.component.html',
  styleUrls: ['./form-creator.component.css']
})
export class FormCreatorComponent implements OnInit {
  enquete: Enquete;
  @ViewChild('dynamic', {
    read: ViewContainerRef
  }) viewContainerRef: ViewContainerRef;

  constructor(private factoryResolver: ComponentFactoryResolver,
    private enqueteService: EnqueteService) { }
  ngOnInit() {
    this.enquete = new Enquete();
    //this.questions.push({ qtype: Qtype.QTEXT, label: 'hello', QCM_choices: [] });
  }

  /*add() {
    //this.questions.push({ qtype: Qtype.QTEXT, label: '', QCM_choices: [] })
  }*/

  addQtext() {
    let factory = this.factoryResolver.resolveComponentFactory(QtextComponent);
    let compRef = this.viewContainerRef.createComponent(factory);
    let question = new QText();
    this.enquete.questions.push(question);
    compRef.instance.question = question;
  }

  addQcm() {
    let factory = this.factoryResolver.resolveComponentFactory(QcmComponent);
    let compRef = this.viewContainerRef.createComponent(factory);
    let question = new QChoixMultiples();
    this.enquete.questions.push(question);
    compRef.instance.question = question;
  }

  envoyer(title: String, description: String, questions: Array<Question>) {
    let expirationDate = new Date();
    //let owner = new Person(1);
    let visibility = [];
    const newEnquete: Enquete = { title, description, visibility, expirationDate, questions } as Enquete;

    this.enqueteService.addEnquete(newEnquete)
      .subscribe();
  }

}
