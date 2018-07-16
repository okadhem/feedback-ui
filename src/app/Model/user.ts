export class User {
  connectedUser: number;
  creator: number;
  dateCreation: Date;
  dateModification: Date;
  societeId: number;
  rowIndex: number;
  isModified:  boolean;
  isReferenced:  boolean;
  id:  number;
  authorities: string[] = [];
  firstName: string;
  lastName: string;
  login: string;
  password: string;
  groupeId: number;
  companyName: string;
  functionId: number;
  isActive:  number;
  personnelId:  number;
  expiredDate: Date;
  spacesList: string[] = [];
  lastLogOnDate:  number;
  loginMode: string[] = [];
  emailPro: string;
  fullName:  string;
  descriptionSource: string;
  userAgent: string;
  spaceId: number;
  isWelcomeMailSend: boolean;
  name:  string;
  enabled:  boolean;
  username:  string;
  accountNonExpired:  boolean;
  accountNonLocked:  boolean;
  credentialsNonExpired:  boolean;

  constructor(){

  }
}

