import {Component, DoCheck, OnInit} from '@angular/core';
import {DataService} from '../websocket/data.service';
import {NotificationService} from './notification.service';
import {Notification} from './Notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit , DoCheck {

  allNotification : Notification[]=[];
  notificationNonVu : Notification[] = [];
  ready:boolean=true;
  update:boolean;
  testNotif: boolean;
  id: number;
  nbrNotifNonVu : number;
  constructor(private notificationService : NotificationService, private dataService:DataService) { }

  ngDoCheck(): void {
    if(this.update){
      console.log("tets notif anissssaaaa", this.update)
      this.ready=false;
      this.getAllNotification();
      this.getNotificationNonVu();
    }
    this.dataService.changeNotif(false);
  }

  ngOnInit() {
    this.getAllNotification();
    this.getNotificationNonVu();
    this.dataService.currentNotif.subscribe(x=>{
      this.update=x;
      //console.log("tets notif anissssaaaa", this.update)
    })

  }

  getAllNotification(){
    this.notificationService.loadNOtif().subscribe(notif =>{
      this.allNotification=notif;
      this.ready=true;
    })
  }

  getNotificationNonVu(){
    this.notificationService.NotifNonVu().subscribe(notif =>{
      this.notificationNonVu=notif;
    })
  }

  getFeedback(item){
    console.log("test de l'id dans la console ", item.idNotification);
    this.id=item.feedback.idFeedback;
    this.notificationService.updateEtatNotif(item.idNotification,"Vu").subscribe(notif =>{
      this.testNotif=notif;
      this.ngOnInit();
    })
  }



}
