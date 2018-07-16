import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvisListComponent } from './avis-list/avis-list.component';
import { DetailAvisComponent } from './detail-avis/detail-avis.component';
import { AddThemeComponent } from './add-theme/add-theme.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AvisListComponent,DetailAvisComponent]
})
export class AvisModule { }
