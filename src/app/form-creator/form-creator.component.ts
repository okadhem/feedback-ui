import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver,ComponentRef } from '@angular/core';
import { QcmComponent } from '../qcm/qcm.component';
import { QtextComponent } from '../qtext/qtext.component';
import { Enquete, Person } from '../enquete';
import { Question } from '../question';
import { QText } from '../qText';
import { QChoixMultiples } from '../qChoixMultiples';
import { EnqueteService } from '../services/enquete.service';
import { AuthService } from '../services/auth.service';
import { QcheckboxComponent } from '../qcheckbox/qcheckbox.component';
import { QCheckbox } from '../qCheckbox';
import { QnumberComponent } from '../qnumber/qnumber.component';
import { QNumber } from '../qNumber';
import { QdatetimeComponent } from '../qdatetime/qdatetime.component';
import { QDateTime } from '../qDateTime';


@Component({
  selector: 'app-form-creator',
  templateUrl: './form-creator.component.html',
  styleUrls: ['./form-creator.component.css']
})
export class FormCreatorComponent implements OnInit {
  enquete: Enquete;

  questions: ComponentRef<any>[] = [];

  @ViewChild('dynamic', {
    read: ViewContainerRef
  }) viewContainerRef: ViewContainerRef;

  employees: Array<Person> = [];
  selectedEmployees: Array<Person> = [];
  visibleForAll: Boolean;

  constructor(private factoryResolver: ComponentFactoryResolver,
    private enqueteService: EnqueteService,
    private authService: AuthService) { }

  ngOnInit() {
    this.getEmployees();
    this.enquete = new Enquete();
    this.visibleForAll = true;

  }

  getEmployees() {
    this.enqueteService.getEmployees()
      .subscribe(employees => {
        this.employees = employees;
        for (var i = 0; i < this.employees.length; i++) {
          this.employees[i].fullName = this.employees[i].lastName + ' ' + this.employees[i].firstName;
        }
      });
  }

  addQtext() {
    let factory = this.factoryResolver.resolveComponentFactory(QtextComponent);
    let compRef = this.viewContainerRef.createComponent(factory);
    let question = new QText();

    this.questions.push(compRef);
    compRef.instance.question = question;
    compRef.instance.compRef = compRef;
  }

  addQcm() {
    let factory = this.factoryResolver.resolveComponentFactory(QcmComponent);
    let compRef = this.viewContainerRef.createComponent(factory);
    let question = new QChoixMultiples();

    this.questions.push(compRef);
    compRef.instance.question = question;
    compRef.instance.compRef = compRef;

  }

  addQcheckbox() {
    let factory = this.factoryResolver.resolveComponentFactory(QcheckboxComponent);
    let compRef = this.viewContainerRef.createComponent(factory);
    let question = new QCheckbox();

    this.questions.push(compRef);
    compRef.instance.question = question;
    compRef.instance.compRef = compRef;

  }

  addQnumber() {
    let factory = this.factoryResolver.resolveComponentFactory(QnumberComponent);
    let compRef = this.viewContainerRef.createComponent(factory);
    let question = new QNumber();

    this.questions.push(compRef);
    compRef.instance.question = question;
    compRef.instance.compRef = compRef;

  }

  addQdatetime() {
    let factory = this.factoryResolver.resolveComponentFactory(QdatetimeComponent);
    let compRef = this.viewContainerRef.createComponent(factory);
    let question = new QDateTime();

    this.questions.push(compRef);
    compRef.instance.question = question;
    compRef.instance.compRef = compRef;

  }

  envoyer(title: String, description: String, questions: Array<Question>, expirationDate: Date) {
    let visibility = this.selectedEmployees;

    questions = this.questions.filter(q => q.instance.isAlive)
                              .map(cr => cr.instance.question);

    const newEnquete: Enquete = { title, description, visibility, expirationDate, questions } as Enquete;
    this.enqueteService.addSurvey(newEnquete, this.authService.getLoggedInUser().id)
      .subscribe();
  }

}

