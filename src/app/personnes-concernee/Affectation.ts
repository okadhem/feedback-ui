import {Categorie} from '../categorie/Categorie';
import {Employee} from '../employee/Employee';
import {Feedback} from '../feedback/Feedback';

export class Affectation{
  id:number;
 feedback:Feedback= new Feedback();
  employee:Employee=new Employee();
  dateCreation:Date;
  constructor() {
  }
}
