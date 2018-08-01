import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { CategorieListComponent } from './categorie/categorie-list/categorie-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Jsonp, JsonpModule, HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingComponent } from './rating/rating.component';
import { html2canvas } from 'html2canvas';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ToastModule } from 'ng2-toastr';
import { DialogModule } from 'primeng/dialog';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { NgSelectModule } from '@ng-select/ng-select';
import { ScreenshotComponent } from './screenshot/screenshot.component';
import { MesFeedbacksComponent } from './feedback/mes-feedbacks/mes-feedbacks.component';
import { DataTablesModule } from 'angular-datatables';
import { DndModule } from 'ng2-dnd';
import { AvisListComponent } from './avis/avis-list/avis-list.component';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { CollaboreteurComponent } from './collaboreteur/collaboreteur.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SupportComponent } from './support/support.component';
import { FeedbackPubliquesComponent } from './feedback/feedback-publiques/feedback-publiques.component';
import { AllFeedbackListComponent } from './feedback/all-feedback-list/all-feedback-list.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { ChartsModule } from 'ng2-charts';
import { EmployeeComponent } from './employee/employee.component';
import { ReponseComponent } from './reponse/reponse.component';
import { DetailAvisComponent } from './avis/detail-avis/detail-avis.component';
import { BsDatepickerModule, RatingModule } from 'ngx-bootstrap';
import { LoginService } from './login/login.service';
import { DetailFeedbackComponent } from './feedback/detail-feedback/detail-feedback.component';
import { SharedModule } from 'primeng/shared';
import { FeedbackModule } from './feedback/feedback.module';
import { AccordionModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'ng5-auto-complete';
import { PersonnesConcerneeComponent } from './personnes-concernee/personnes-concernee.component';
import { AddThemeComponent } from './avis/add-theme/add-theme.component';
import { DataService } from './websocket/data.service';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './notification/notification.service';
import { WeatherComponent } from './weather-widget/component/weather.component';
import { TempUnitPipe } from './weather-widget/pipe/temp-unit';
import { SpeedUnitPipe } from './weather-widget/pipe/speed-unit';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { AuthgardGuard } from './login/authgard.guard';
import { FormCreatorComponent } from './form-creator/form-creator.component';
import { QtextComponent } from './qtext/qtext.component';
import { QcmComponent } from './qcm/qcm.component';
import { EnqueteService } from './services/enquete.service';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { SurveyComponent } from './survey/survey.component';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent,
    canActivate: [AuthgardGuard],
    /* canActivateChild:[AuthGuard],*/
    children: [

      { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
      /* { path: 'Feedback', component: FeedbackComponent },*/
      { path: 'Collaborateur', component: CollaboreteurComponent },
      { path: 'Support', component: SupportComponent },
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'survey', component: SurveyComponent },
      { path: 'form-creator', component: FormCreatorComponent },
      { path: 'form-renderer/:id', component: FormRendererComponent },


    ]
  },
  { path: 'login', component: AuthComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];



@NgModule({
  declarations: [
    WeatherComponent,
    AddThemeComponent,
    AllFeedbackListComponent,
    DetailFeedbackComponent,
    FeedbackPubliquesComponent,
    AppComponent,
    MesFeedbacksComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    CategorieListComponent,
    RatingComponent,
    HomeComponent,
    ScreenshotComponent,
    AvisListComponent,
    LoginComponent,
    CollaboreteurComponent,
    DashboardComponent,
    SupportComponent,
    StatistiqueComponent,
    EmployeeComponent,
    DetailFeedbackComponent,
    DetailAvisComponent,
    ReponseComponent,
    TempUnitPipe,
    SpeedUnitPipe,
    PersonnesConcerneeComponent,
    NotificationComponent,
    AuthComponent,
    FormCreatorComponent,
    QtextComponent,
    QcmComponent,
    FormRendererComponent,
    SurveyComponent,
    SurveyListComponent
  ],
  imports: [AutoCompleteModule,
    JsonpModule,
    AccordionModule,
    RatingModule.forRoot(),
    ChartsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    NgSelectModule,
    LoginModule,
    DndModule,
    ReactiveFormsModule,
    DataTablesModule,
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpClientModule,
    DialogModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FormsModule,
    SharedModule,
    MatDatepickerModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.rotatingPlane,
      backdropBackgroundColour: 'rgba(23,73,142,0.9)',
      backdropBorderRadius: '0px',
      primaryColour: '#17498e',
      secondaryColour: '#17498e',
      tertiaryColour: '#17498e'

    }),
    BsDatepickerModule.forRoot()
  ],
  providers: [
    LoginService,
    DataService,
    NotificationService,
    EnqueteService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    PersonnesConcerneeComponent,
    AddThemeComponent,
    QtextComponent,
    QcmComponent
  ],

})
export class AppModule {
}
