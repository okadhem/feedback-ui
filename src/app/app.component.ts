import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';
import {DataService} from './websocket/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{




  ngOnInit(): void {





  }

  title = 'app';


  constructor(private router:Router, private dataService: DataService
  ) {
  }






}
