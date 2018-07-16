import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HomeComponent} from '../home/home.component';
import {ThemeAvis} from '../avis/ThemeAvis';
import {AvisListComponent} from '../avis/avis-list/avis-list.component';

@Component({
  selector: 'app-screenshot',
  templateUrl: './screenshot.component.html',
  styleUrls: ['./screenshot.component.css']
})
export class ScreenshotComponent implements OnInit {
themeavis:ThemeAvis;
  constructor( public dialogRef: MatDialogRef<AvisListComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {

this.themeavis=data.child;
  }

  ngOnInit() {

  }
  onNoClick(): void {
    this.dialogRef.close();

  }


}
