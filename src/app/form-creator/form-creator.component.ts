import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { QcmComponent } from '../qcm/qcm.component';
import { QtextComponent } from '../qtext/qtext.component';
import { Enquete, Person } from '../enquete';
import { Question } from '../question';
import { QText } from '../qText';
import { QChoixMultiples } from '../qChoixMultiples';
import { EnqueteService } from '../services/enquete.service';
import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { startWith } from 'rxjs/operator/startWith';


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


  myControl = new FormControl();
  options: Person[] = [
    { firstname: 'leila', lastname: 'medhioub', id: 1 },
    { firstname: 'kadhem', lastname: 'ouerghi', id: 2 },
  ];
  filteredOptions: Observable<Person[]>;



  constructor(private factoryResolver: ComponentFactoryResolver,
    private enqueteService: EnqueteService,
    private authService: AuthService) { }


  ngOnInit() {
    this.enquete = new Enquete();


    /*this.filteredOptions = this.myControl.valueChanges.startWith('')
      .pipe(
        map(value => typeof value === 'string' ? <String>value : (<Person>value).firstname),
        map(name => <String>name ? this._filter(<String>name) : this.options.slice())
      );*/

      this.filteredOptions = this.myControl.valueChanges
      .map(v => {
        let t = v.split(' ');
        return t[t.lenght() - 1]} )
      .map(v => this.options.filter(per => per.firstname.startsWith(v)) );
      //this.myControl.valueChanges.subscribe(v => this.filteredOptions.)
  }

  displayFn(user?: Person): String | undefined {
    return user ? user.firstname : undefined;
  }

  private _filter(name: String): Person[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.firstname.toLowerCase().indexOf(filterValue) === 0);
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

  envoyer(title: String, description: String, questions: Array<Question>, expirationDate: Date) {
    //let owner = new Person(1);
    let visibility = [];
    const newEnquete: Enquete = { title, description, visibility, expirationDate, questions } as Enquete;

    this.enqueteService.addSurvey(newEnquete, this.authService.getLoggedInUser().id)
      .subscribe();
  }

}

