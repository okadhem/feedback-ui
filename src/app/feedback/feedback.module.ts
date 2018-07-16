import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackCreateComponent } from './feedback-create/feedback-create.component';
import { MesFeedbacksComponent } from './mes-feedbacks/mes-feedbacks.component';
import { AllFeedbackListComponent } from './all-feedback-list/all-feedback-list.component';
import { FeedbackPubliquesComponent } from './feedback-publiques/feedback-publiques.component';
import { DetailFeedbackComponent } from './detail-feedback/detail-feedback.component';
import {MatAutocompleteModule, MatFormFieldModule, MatTooltipModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PersonnesConcerneeComponent} from '../personnes-concernee/personnes-concernee.component';
@NgModule({
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    MatTooltipModule
  ],
  declarations: [PersonnesConcerneeComponent,FeedbackCreateComponent, MesFeedbacksComponent,AllFeedbackListComponent,DetailFeedbackComponent,FeedbackPubliquesComponent]
})
export class FeedbackModule { }
