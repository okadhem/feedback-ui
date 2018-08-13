import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Enquete } from '../enquete';
import { EnqueteService } from '../services/enquete.service';
import { AuthService } from '../services/auth.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {

  public enquetes$: Observable<Enquete[]>;
  dataSource: MatTableDataSource<Enquete>;
  displayedColumns: string[] = ['title', 'icons'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  authorized = new Map();

  constructor(private enqueteService: EnqueteService,
    private authService: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.get();
  }

  get(): void {

    this.enquetes$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.enqueteService.getSurveys(this.authService.getLoggedInUser().id))
    );

    this.enquetes$.subscribe(x => {
      this.dataSource = new MatTableDataSource<Enquete>(x);
      this.dataSource.paginator = this.paginator;
      for (let enquete of x) {
        this.enqueteService.isAuthorized(enquete.id, this.authService.getLoggedInUser().id)
          .subscribe(res => {
            //this.authorized.push({ id: enquete.id, authorized: res });
            this.authorized.set(enquete.id, res);
          });
      }

    });

  }

  isAuthorized(id: Number): Boolean {
    return this.authorized.get(id);
  }

}
