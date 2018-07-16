import {Component, DoCheck, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {ThemeAvis} from '../ThemeAvis';
import {AvisService} from '../avis.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PersonnesConcerneeComponent} from '../../personnes-concernee/personnes-concernee.component';
import {DataService} from '../../websocket/data.service';

@Component({
  selector: 'app-add-theme',
  templateUrl: './add-theme.component.html',
  styleUrls: ['./add-theme.component.css'],
  providers:[AvisService]
})
export class AddThemeComponent implements OnInit {


  updateTheme: boolean;
  themeAdd : ThemeAvis = new ThemeAvis();
  @Output () testTheme: EventEmitter<boolean> = new EventEmitter();
  testDate1:Date;
  constructor(private avisService: AvisService , public dialogRef1: MatDialogRef<AddThemeComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any, private dataService: DataService) { }


  ngOnInit() {
    this.dataService.currentUpdateThemeTable.subscribe(x=>{
      this.updateTheme=x;
    })
  }
  onNoClick(): void {
    this.dialogRef1.close();
  }
  submit(){

    this.avisService.addTheme(this.themeAdd).subscribe(x=>{
      this.themeAdd=x

      this.testTheme.emit(true);
      this.themeAdd = new ThemeAvis();
      this.dataService.changeUpdateThemeTable(true);
    })
  }


}
