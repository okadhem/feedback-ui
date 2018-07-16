import {Component, DoCheck, Input, OnChanges, OnInit} from '@angular/core';
import {AvisService} from '../avis.service';
import {Avis} from '../Avis';
import {LoginService} from '../../login/login.service';
import {AvisUtile} from '../../Model/AvisUtile';
import {NbrUtile} from '../../Model/nbrUtile';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  
  selector: 'app-detail-avis',
  templateUrl: './detail-avis.component.html',
  styleUrls: ['./detail-avis.component.css'],
  providers:[AvisService]
})
export class DetailAvisComponent implements OnInit , OnChanges {


  @Input() id:number;
  @Input() obj:string;

  AvisUTile:AvisUtile = new AvisUtile();
  avisByTheme: Avis[]=[];
  moyenneRating:number[] =[] ;
  allUtile : AvisUtile[]=[];
  existe:boolean=false;
  nbrUtile : NbrUtile[]=[];
  idUtile: number;
  testBl:boolean;
  testTab:boolean[]=[];
  connected : number;
  constructor(private avisService: AvisService ,private loginService : LoginService) {

  }

  ngOnInit() {
    this.avisService.loadAllAvisUtile().subscribe(x=>{
      this.allUtile=x;

    })
    this.avisService.loadNbrUtileByAvis().subscribe(x=>{
      this.nbrUtile = x;
    })
    this.connected = JSON.parse(localStorage.getItem('currentUser')).personnelId;




  }

  ngOnChanges() {
    console.log("4er test ", this.id);
    console.log(this.obj);
    /* this.avisService.findOneTheme(this.id).subscribe(x=> {
       this.themeAvis=x;
     });*/

    this.ngOnInit();
    if (this.id != undefined) {
      this.avisService.loadAvisByIdTheme(this.id).subscribe(x => {
        this.avisByTheme = x;
        /*
        for(let itemIdAv of this.avisByTheme){
          console.log("this",itemIdAv.idAvis)

          for(let item of this.allUtile){
            if(JSON.parse(localStorage.getItem('currentUser')).personnelId == item.personel.id && item.avis.idAvis == itemIdAv.idAvis){
              console.log("test de l'id",item.idUtile)
              this.idUtile = item.idUtile;
              this.testBl=false;

            }

          }
          console.log(this.testBl)
        }*/



      })
      this.avisService.loadMoyenneRate(this.id).subscribe(x => {

        this.moyenneRating[0] = x[0];

        console.log(this.moyenneRating);
      })
      this.moyenneRating[0] = 0;



    }
  }

  verif(idAvis): boolean {
    let test = false;
   for (let util of this.allUtile) {
     test = util.personel.id === this.connected && util.avis.idAvis === idAvis;
     if (test) {
       break;
     }
   }
    return test;
  }

  AddAvisUtile(avis : number){
    console.log("id de l'avis est", avis);
    for(let item of this.allUtile){
      if(JSON.parse(localStorage.getItem('currentUser')).personnelId == item.personel.id && item.avis.idAvis == avis){
        console.log("test de l'id",item.idUtile)
        this.idUtile = item.idUtile;
        this.existe=true;

      }
    }
    this.AvisUTile.personel.id= JSON.parse(localStorage.getItem('currentUser')).personnelId;
    this.AvisUTile.avis.idAvis=avis;
    if(this.existe == false) {


      this.avisService.AddAvisUtile(this.AvisUTile).subscribe(x => {
          this.AvisUTile = x
          console.log("un avis est ajouter ")
          this.AvisUTile = new AvisUtile();
          this.ngOnInit();

        }
      );


    }else{
      console.log("la personne existe ",this.idUtile);


      this.avisService.deleteUtil(this.idUtile).subscribe(value => {
        console.log("utile a été supprimer");

        this.ngOnInit();
      })
    }
      this.idUtile = null;
    console.log(this.idUtile)
    this.existe=false;
  }


}
