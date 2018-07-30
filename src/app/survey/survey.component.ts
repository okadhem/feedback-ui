import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { UserDTO } from '../user/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}
