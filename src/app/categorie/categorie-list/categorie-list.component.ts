import {Component, DoCheck, ElementRef, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CategorieService} from '../categorie.service';
import {Categorie} from '../Categorie';
import {Params, Router, RouterModule} from '@angular/router';
import {FormControl, FormGroup, FormGroupName, Validators} from '@angular/forms';
import {FeedbackService} from '../../feedback/feedback.service';
import {Feedback} from '../../feedback/Feedback';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';
import {RatingComponent} from '../../rating/rating.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatExpansionModule, MatSnackBar} from '@angular/material';
import * as html2canvas from 'html2canvas';
import {ScreenshotComponent} from '../../screenshot/screenshot.component';
import {HttpClient, HttpErrorResponse, HttpEventType, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AppComponent} from '../../app.component';
import {ToastsManager} from 'ng2-toastr';
import {AvisService} from '../../avis/avis.service';
import {ThemeAvis} from '../../avis/ThemeAvis';
import {DragDropConfig, DragDropData, DragDropService, DragDropSortableService} from 'ng2-dnd';
import {Avis} from '../../avis/Avis';
import {LoginService} from '../../login/login.service';
import {forEach} from '@angular/router/src/utils/collection';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {stringDistance} from 'codelyzer/util/utils';
import {DataService} from '../../websocket/data.service';
import {Notification} from '../../notification/Notification';
import {NotificationService} from '../../notification/notification.service';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
declare var swal: any;


@Component({

  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css'],
  providers: [CategorieService, FeedbackService, AvisService, DragDropData, DragDropService, DragDropConfig, DragDropSortableService]

})

export class CategorieListComponent implements OnInit {


  Catego: Categorie = new Categorie();
  FeedbackFileAnomalie: Feedback = new Feedback();
  panelOpenState: boolean = false;
  disable = false;
  okA = false;
  idtheme: number;
  overlay = false;
  feedFormActive: boolean = true;
  fileI: File;
  number: number;
  Names: string[] = [];
  selectedFiles: FileList;
  selectedFilesAnomalie: FileList;
  currentFileUpload: File;
  currentFileUploadAnomalie: File;
  progress: { percentage: number } = {percentage: 0};
  scorerating: number;
  myFiles: string [] = [];
  sMsg: string = '';
  display: boolean = false;
  score: number;
  displayRatingScore = 4;
  crit: string = 'Normal';
  loading = false;
  fileName: string;
  fileName2: string;
  rate: number;
  afficherAnomalie: boolean = false;
  afficherAvis: boolean = false;
  afficherProp: boolean = false;
  Avis: Avis = new Avis();
  feed: Feedback = new Feedback();
  feedAnomalie: Feedback = new Feedback();
  anonymat = false;
  visibilite = true;
  themes: ThemeAvis[];
  public Categories: Categorie[];
  type: string;
  themaAvis: ThemeAvis;
  Categ: Categorie;
  text: string;
  anomalie = new Feedback();
  submitted = false;
  accordionClose: boolean = false;
  step = 0;
  clik = '';
  private file: File;
  updateAllFeedback: boolean;
  updateMesFeedback: boolean;
  updateFeedbackPub: boolean;
  ws: any;
  notif:boolean;
  notification: Notification= new Notification();
  nameSende: String;
  ready:boolean=true;
  updateTheme:boolean;


  constructor(private categorieService: CategorieService, private FeedbackS: FeedbackService, private httpService: HttpClient, private router: Router, private notificationService: NotificationService,
              public dialog: MatDialog, private ThemeAvisService: AvisService, private login: LoginService, public snackBar: MatSnackBar, private element: ElementRef, private dataService: DataService) {

    this.feed.visibiliteFeedback = false;
    this.feed.anonymatFeedback = false;
    this.selectedFiles = null;
    this.selectedFilesAnomalie = null;
    let socket = new WebSocket('ws://localhost:8087/greeting');
    this.ws = Stomp.over(socket);


  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }


  ngOnInit() {

    this.getAllCategories();
    //this.getAllThemes();
    this.feed.visibiliteFeedback = true;
    this.feed.anonymatFeedback = false;
    this.feedAnomalie.visibiliteFeedback = true;
    this.feedAnomalie.anonymatFeedback = false;
    this.loadNames();
    this.FeedbackS.LoadNames().subscribe(x => {
      this.Names = x;
    });
    this.dataService.currentUpadteAllFeedback.subscribe(update => this.updateAllFeedback = update);
    this.dataService.currentUpdateMesFeedback.subscribe(update => this.updateMesFeedback = update);
    this.dataService.currentUpdateFeedbackPub.subscribe(update => this.updateFeedbackPub = update);
    this.dataService.currentNotif.subscribe(update => this.notif = update);
    this.dataService.currentNanmeSender.subscribe(update => this.nameSende = update);
    this.dataService.currentUpdateThemeTable.subscribe(update=>this.updateTheme=update);
    this.dataService.currentUpdateThemeTable.subscribe(update=>this.updateTheme=update);




  }

  showAlert() {

    swal(
      'Ajouté!',
      'votre feedback a été ajouté.',
      'success',
    );

  }

  loadNames() {
  }


  pdfDownload() {
    document.getElementById('myNav').style.width = '0px';

    var img = new Image();
    html2canvas(document.body).then(canvas => {
      var imgData = canvas.toDataURL('image/png');
      img.src = imgData;
      img.width = 1200;
      img.height = 1000;
      this.fileI = canvas;
      var blobBin = atob(imgData.split(',')[1]);
      var array = [];
      for (var i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
      }
      this.fileName = Date.now().toString() + '.png';
      console.log(this.fileName);
      var blob = new Blob([new Uint8Array(array)], {type: 'image/png'});
      this.file = new File([blob], this.fileName, {lastModified: Date.now()});
      photo = null;
      var photo = this.element.nativeElement.querySelector('.screenshot');
      photo.src = img.src;
      document.getElementById('divScreen').style.width = '1500px';

    });
  }

  showForm() {

    document.getElementById('divScreen').style.width = '0px';
    this.okA = true;

  }

  closeForm() {
    this.okA = false;
  }

  add(M: FormGroup) {
    this.categorieService.findOne(2).subscribe(zzz => {
      this.Catego = zzz;
      this.FeedbackFileAnomalie.employee.id = JSON.parse(localStorage.getItem('currentUser')).personnelId ;

      this.FeedbackFileAnomalie.categorieDTO = this.Catego;
      this.FeedbackFileAnomalie.visibiliteFeedback = false;
      this.FeedbackFileAnomalie.anonymatFeedback = false;
      this.FeedbackFileAnomalie.criticite = this.crit;
      this.FeedbackS.createF(this.FeedbackFileAnomalie).subscribe(feed => {
        this.FeedbackFileAnomalie = feed;
        this.FeedbackS.ajouterDocument(this.file, this.FeedbackFileAnomalie.idFeedback).subscribe(event => {
          if (event instanceof HttpResponse) {
            console.log('File is completely uploaded!');
          }
        });

        this.resetVisiblity();
        this.FeedbackFileAnomalie = new Feedback();
        this.showAlert();
        this.okA = false;

      });
    });

  }

  isVisible() {
    this.visibilite = !this.visibilite;

  }

  isAno() {
    this.anonymat = !this.anonymat;
  }

  closePop() {
    this.afficherAnomalie = false;
    this.afficherAvis = false;
    this.afficherProp = false;
  }


  clic1() {
    this.crit = 'Normal';
    this.openSnackBar('La criticité de votre Anomalie est Normal', 'close');

  }

  clic2() {
    this.crit = 'Urgent';
    this.openSnackBar('La criticité de votre Anomalie est Urgente', 'close');
  }

  clic3() {
    this.crit = 'Bloquant';
    this.openSnackBar('La criticité de votre Anomalie est Bloquant', 'close');
  }

  onRateChange = (score1: number) => {
    this.score = score1;

  };


  receiveMessage(event) {
    this.scorerating = event;
  }

  getAllCategories() {
    this.categorieService.findAll().subscribe(
      Categories => {
        this.Categories = Categories;
      },
      err => {
        console.log(err);
      }
    );
  }

  getAllThemes() {
    this.ThemeAvisService.LoadAllThemes().subscribe(
      theme => {
        this.themes = theme;
        this.themes.forEach(t => {
        });

      },
      err => console.log(err),
    );
  }

  getCategorie(idC: number) {
    this.categorieService.findOne(idC).subscribe(zzz => {

        this.Categ = zzz;
        this.type = this.Categ.typeCategorie;
        if (this.type == 'PROPOSITION') {
          this.afficherProp = true;
          this.afficherAvis = false;
          this.afficherAnomalie = false;
        } else {
          if (this.type == 'AVIS') {
            this.getAllThemes();
            this.afficherAvis = true;
            this.afficherProp = false;
            this.afficherAnomalie = false;
          }
          else {
            if (this.type == 'ANOMALIE') {
              this.afficherAnomalie = true;
              this.afficherAvis = false;
              this.afficherProp = false;
            }
          }
        }
      },
      err => {
        console.log(err);
      });

  }


  getThemeByID(idC: number) {
    this.ThemeAvisService.findOneTheme(idC).subscribe(zzz => {
        this.themaAvis = zzz;
        console.log(this.themaAvis);
        this.clik = this.themaAvis.themeAvis;
        this.accordionClose = true;


      },
      err => {
        console.log(err);
      });

  }

  addProposition(myform: FormGroup) {

    this.feed.categorieDTO = this.Categ;
    this.feed.employee.id = JSON.parse(localStorage.getItem('currentUser')).personnelId;
    this.feed.visibiliteFeedback = this.visibilite;
    this.feed.anonymatFeedback = this.anonymat;
    this.FeedbackS.createF(this.feed).subscribe(feed => {
      this.feed = feed;

      /**Add Noification */
      console.log('test de l\'id feedback ', this.feed.idFeedback);
      console.log('test de l\'ajut de proposition et de l\'utilisateur du feedback', this.feed.employee.id);
      this.notification.feedback.idFeedback = this.feed.idFeedback;
      this.notification.personnelExpediteur.id = this.feed.employee.id;
      this.notificationService.createNotif(this.notification).subscribe(x => {
        this.notification = x;
        this.dataService.changeNotif(true);
        console.log('lajou du notif est bien reussi anissa bravooooo');
        this.notification = new Notification();
      });

      if (this.selectedFiles != null) {
        this.currentFileUpload = this.selectedFiles.item(0);
        this.FeedbackS.ajouterDocument(this.currentFileUpload, this.feed.idFeedback).subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress.percentage = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            console.log('File is completely uploaded!');
          }
        });
      }

      let data = JSON.stringify({
        'test': true
      });

      console.log('test dans add feedback proposition');
      this.ws.send('/app/updateTab', {}, data);
      let notifData = JSON.stringify({
        'testNotif': true
      });
      this.ws.send('/app/notif', {}, notifData);
      this.dataService.changeUpdateAllFeedback(true);
      this.dataService.changeUpdateMesFeedback(true);
      this.dataService.changeUpdateFeedbackPub(true);
      this.dataService.changeNameSender(JSON.parse(localStorage.getItem('currentUser')).fullName);
      this.dataService.changeNotif(true);

      this.resetVisiblity();
      this.feed = new Feedback();
      this.showAlert();

    });

  }

  addAnomalie(myForm: FormGroup) {
    this.feedAnomalie.employee.id = JSON.parse(localStorage.getItem('currentUser')).personnelId;
    this.feedAnomalie.categorieDTO = this.Categ;
    this.feedAnomalie.visibiliteFeedback = this.visibilite;
    this.feedAnomalie.anonymatFeedback = this.anonymat;
    this.feedAnomalie.criticite = this.crit;
    this.FeedbackS.createF(this.feedAnomalie).subscribe(feed => {
      this.feedAnomalie = feed;

      this.notification.feedback.idFeedback = this.feedAnomalie.idFeedback;
      this.notification.personnelExpediteur.id =  JSON.parse(localStorage.getItem('currentUser')).personnelId
      ;

      this.notificationService.createNotif(this.notification).subscribe(x => {
        this.notification = x;
        this.dataService.changeNotif(true);
        console.log('lajou du notif est bien reussi anissa bravooooo test de l\'anomalie');
        this.notification = new Notification();
      });


      if (this.selectedFilesAnomalie != null) {
        this.currentFileUploadAnomalie = this.selectedFilesAnomalie.item(0);
        this.FeedbackS.ajouterDocument(this.currentFileUploadAnomalie, this.feedAnomalie.idFeedback).subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress.percentage = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            console.log('File is completely uploaded!');
          }

        });
      }
      let data = JSON.stringify({
        'test': true
      });
      this.ws.send('/app/updateTab', {}, data);
      let notifData = JSON.stringify({
        'testNotif': true
      });
      this.ws.send('/app/notif', {}, notifData);
      this.dataService.changeUpdateAllFeedback(true);
      this.dataService.changeUpdateMesFeedback(true);
      this.dataService.changeUpdateFeedbackPub(true);
      this.dataService.changeNotif(true);
      this.resetVisiblity();
      this.feedAnomalie = new Feedback();
      this.showAlert();
    });


  }

  resetVisiblity() {
    this.visibilite = true;
    this.anonymat = false;
  }

  addRating(myform: FormGroup) {

    this.Avis.employe = JSON.parse(localStorage.getItem('currentUser')).personnelId;
    this.Avis.rate = this.scorerating;
    this.Avis.themeAvis = this.themaAvis;
    this.ThemeAvisService.AddAvis(this.Avis).subscribe(a => {
      this.Avis = a;

      swal(
        'Ajouté!',
        'votre Avis concernant "' + this.themaAvis.themeAvis + '" a été ajouté.',
        'success',
      );

      this.Avis = new Avis();
      this.accordionClose = false;
      this.getAllThemes();
      this.dataService.changeUpdateThemeTable(true);
    });
  }

  onSubmit(myform: FormGroup) {
    this.feed.visibiliteFeedback = false;
    this.feed.anonymatFeedback = false;
    this.feed.criticite = 'Normal';
    myform.reset();
  }

  ajouterDocument(e) {
    this.selectedFiles = e.target.files;
    this.progress.percentage = 0;
    this.openSnackBar('votre Fichier ' + this.selectedFiles.item(0).name + 'est bien ajouté  ', 'close');
  }

  ajouterDocumentAnomalie(e) {
    this.selectedFilesAnomalie = e.target.files;
    this.progress.percentage = 0;
    this.openSnackBar('votre Fichier ' + this.selectedFilesAnomalie.item(0).name + 'est bien ajouté  ', 'close');
  }

  ResetSlide() {
    this.afficherAvis = false;
    this.afficherAnomalie = false;
    this.afficherProp = false;
  }

}
