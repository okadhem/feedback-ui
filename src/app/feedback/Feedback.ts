import {Categorie} from '../categorie/Categorie';
import {Employee} from '../employee/Employee';



export class Feedback{
  idFeedback:number;
  objetFeedback:string;
  contenuFeedback:string;
  criticite:string;
  anonymatFeedback:boolean;
  visibiliteFeedback:boolean;  
  categorieDTO:Categorie;
  etatFeedback:string;
  connectedUser:number;
  dateCreation:Date;
  employee:Employee=new Employee();
  nombreReponse:number;
  constructor() {}

}

