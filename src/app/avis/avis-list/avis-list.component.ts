import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {AvisService} from '../avis.service';
import {ThemeAvis} from '../ThemeAvis';
import {ScreenshotComponent} from '../../screenshot/screenshot.component';
import {MatDialog} from '@angular/material';
import {LoginService} from '../../login/login.service';
import {Router} from '@angular/router';
import {PersonnesConcerneeComponent} from '../../personnes-concernee/personnes-concernee.component';
import {AddThemeComponent} from '../add-theme/add-theme.component';
import {Avis} from '../Avis';
import {DataService} from '../../websocket/data.service';

@Component({
  selector: 'app-avis-list',
  templateUrl: './avis-list.component.html',
  styleUrls: ['./avis-list.component.css'],
  providers: [AvisService]
})
export class AvisListComponent implements OnInit, DoCheck {

  ready:boolean=true;
  updateTheme:boolean;
  avisByTheme: Avis[] = [];
  moyenneRating: number = 0;
  nbParticipant: number;
  themes1: ThemeAvis[] = [];
  dtOptions: any = {};
  themeAvis1: ThemeAvis;
  id: number;
  objet: string;
  route: string;
  private deleted: boolean;
  showw:boolean[];
  constructor(private ThemeAvisService: AvisService, public dialog: MatDialog, private login: LoginService, private roote: Router, private dataService: DataService) {
  }

  ngDoCheck():void{
    if(this.updateTheme){
      this.ready=false;
      this.getAllThemes1();
    }
    this.dataService.changeUpdateThemeTable(false);
  }
  ngOnInit() {
    this.getAllThemes1();
    this.ThemeAvisService.LOADNBParticipant().subscribe(nb => this.nbParticipant = nb);
    this.dtOptions = {
      paging: false,
      bInfo: false

    };
    this.route = this.roote.url;
    this.dataService.currentUpdateThemeTable.subscribe(x=>{
      this.updateTheme=x;
    })
  }
  show(i:number){
    this.showw[i]=true;
  }

  dontshow(i) {
    this.showw[i]=false;
  }
  getAllThemes1() {
    this.ThemeAvisService.LoadAllThemes1().subscribe(theme => {
      this.themes1 = theme;
      this.showw = new Array();
      for (var i = 0; i < this.themes1.length; i++) {
        this.showw.push(false);
      }
      this.themes1.forEach(x => {
        this.ThemeAvisService.loadMoyenneRate(x.idThemeAvis).subscribe(y => {
          if (y[0]==undefined )
            x.moyenne = 0;
          else
            x.moyenne = y[0];


        });

      });

  this.ready=true;
    });

  }
  openDialog(): void {
    let dialogRef1 = this.dialog.open(AddThemeComponent, {
      width: '634px',

    });

    dialogRef1.afterClosed().subscribe(result => {

    });
  }

  DeleteTheme(idtheme){
    console.log("test body ", idtheme);

    this.ThemeAvisService.DeleteTheme(idtheme).subscribe(value => {

      console.log("bravo nosnos");
      this.ngOnInit();
    });
  }

  getThemeByID(idC: number) {
    this.ThemeAvisService.findOneTheme(idC).subscribe(zzz => {
        this.themeAvis1 = zzz;
      },
      err => {
        console.log(err);
      });

  }

  tableEvent(item) {
    this.id = item.idThemeAvis;
    this.objet = item.themeAvis;
  }

  reloadTab(event) {
    if (event === true) {
      this.ngOnInit();
    }
  }


}
