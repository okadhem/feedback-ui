import {Employee} from '../employee/Employee';
import {Feedback} from '../feedback/Feedback';

export class ReponseDTO
{
  idReponse: number;
  reponse: string;
  feedbackDTO : Feedback= new Feedback();
  dateCreation: Date;
  connectedUser: number;
  employe: Employee = new Employee();


}


