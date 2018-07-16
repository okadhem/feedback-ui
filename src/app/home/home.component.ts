import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as html2canvas from "html2canvas";
import {ScreenshotComponent} from '../screenshot/screenshot.component';
import {LoginService} from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog,private login:LoginService) {}


  openDialog(): void {

    let dialogRef = this.dialog.open(ScreenshotComponent, {
      width: '500px',
      height:'800px'
    });

    dialogRef.afterClosed().subscribe(result => {


    });
  }


  ngOnInit() {

  }

}
