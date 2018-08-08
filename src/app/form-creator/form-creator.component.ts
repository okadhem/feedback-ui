import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { QcmComponent } from '../qcm/qcm.component';
import { QtextComponent } from '../qtext/qtext.component';
import { Enquete, Person } from '../enquete';
import { Question } from '../question';
import { QText } from '../qText';
import { QChoixMultiples } from '../qChoixMultiples';
import { EnqueteService } from '../services/enquete.service';
import { AuthService } from '../services/auth.service';


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

  envoyer(title: String, description: String, questions: Array<Question>, expirationDate: Date) {
    let visibility = this.selectedEmployees;
    const newEnquete: Enquete = { title, description, visibility, expirationDate, questions } as Enquete;
    this.enqueteService.addSurvey(newEnquete, this.authService.getLoggedInUser().id)
      .subscribe();
  }

}

