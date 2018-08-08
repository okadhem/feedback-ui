import { Component, OnInit } from '@angular/core';
import { Enquete } from '../enquete';
import { EnqueteService } from '../services/enquete.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {

  public enquetes: Enquete[];

  constructor(private enqueteService: EnqueteService,
    private authService: AuthService) { }

  ngOnInit() {
    this.get();
  }

  get(): void {
    this.enqueteService.getSurveys(this.authService.getLoggedInUser().id)
      .subscribe(enquetes =>
        this.enquetes = enquetes);
  }
}
