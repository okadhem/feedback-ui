import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChartsModule} from 'ng2-charts';
import {BrowserModule} from '@angular/platform-browser';
import {
  MatAutocompleteModule, MatChipsModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatInputModule,
  MatSnackBarModule
} from '@angular/material';
import {LoginModule} from '../login/login.module';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {DndModule} from 'ng2-dnd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RatingModule} from 'ngx-bootstrap';
import {RouterModule} from '@angular/router';
import {SharedModule} from 'primeng/shared';
import {DataTablesModule} from 'angular-datatables';
import {HttpModule} from '@angular/http';

import {DialogModule} from 'primeng/dialog';


@NgModule({
  imports: [
    CommonModule,
    RatingModule.forRoot(),
    ChartsModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    LoginModule,
    MatInputModule,
    DndModule,
    MatFormFieldModule,
    MatExpansionModule,
    DataTablesModule ,
    MatChipsModule,
    BrowserModule, BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    DialogModule,
    HttpModule,
ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule ,
    SharedModule,
    MatChipsModule
  ],
  declarations: []
})
export class CategorieModule { }
