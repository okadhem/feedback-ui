
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private updateAllFeedback = new BehaviorSubject<boolean>(false);
  currentUpadteAllFeedback= this.updateAllFeedback.asObservable();
  private updateMesFeedback =new BehaviorSubject<boolean>(false);
  currentUpdateMesFeedback= this.updateMesFeedback.asObservable();
  private updateFeedbackPub= new BehaviorSubject<boolean>(false);
  currentUpdateFeedbackPub= this.updateFeedbackPub.asObservable();
  private updateReponse = new BehaviorSubject<boolean>(false);
  currentUpdateReponse= this.updateReponse.asObservable();
  private updateWorkFlow= new BehaviorSubject<boolean>(false);
  currentUpdateWorkflow = this.updateWorkFlow.asObservable();
  private notif = new BehaviorSubject<boolean>(false);
  currentNotif = this.notif.asObservable();
  private nameSender = new BehaviorSubject<string>('');
  currentNanmeSender = this.nameSender.asObservable();

  private updateWorkFlowSetPRop= new BehaviorSubject<boolean>(false);
  currentUpdateWorkflowsetProp = this.updateWorkFlowSetPRop.asObservable();

  private updateWorkflowAnoWs= new BehaviorSubject<boolean>(false);
  currentUpdateWorkflowAnoWs = this.updateWorkflowAnoWs.asObservable();

  private updateThemeTable = new BehaviorSubject<boolean>(false);
  currentUpdateThemeTable = this.updateThemeTable.asObservable();

  constructor() { }

  changeUpdateWorkflow(update:boolean){
    this.updateWorkFlow.next(update);
  }

  changeUpdateWorkflowProp(update:boolean){
    this.updateWorkFlowSetPRop.next(update);
  }

  changeUpdateAllFeedback(update: boolean){
    this.updateAllFeedback.next(update);
  }
  changeUpdateMesFeedback(update : boolean){
    this.updateMesFeedback.next(update);
  }

  changeUpdateFeedbackPub(update : boolean){
    this.updateFeedbackPub.next(update);
  }
  changeUpdateReponse(update: boolean){
    this.updateReponse.next(update);
  }

  changeNotif(notif : boolean){
    this.notif.next(notif);
  }

  changeNameSender(send : string){
    this.nameSender.next(send);
  }

  changeUpdateWorkflowAnoWs(update: boolean){
    this.updateWorkflowAnoWs.next(update);
  }

  changeUpdateThemeTable(update: boolean){
    this.updateThemeTable.next(update);
  }


}

