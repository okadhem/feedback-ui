import {Feedback} from '../feedback/Feedback';
import {Employee} from '../employee/Employee';



export class Notification{
  idNotification:number;
  etatNotif : string;
  feedback: Feedback = new Feedback();
  personnelExpediteur: Employee = new Employee();
  dateCreation: Date;
  constructor(){

  }
}

