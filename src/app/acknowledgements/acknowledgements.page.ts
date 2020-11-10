import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { License } from '../license';
import { groupBy, map, mergeMap, toArray } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-acknowledgements',
  templateUrl: './acknowledgements.page.html',
  styleUrls: ['./acknowledgements.page.scss'],
})
export class AcknowledgementsPage implements OnInit {
  licenses$: Observable<License[]>;

  constructor(private http: HttpClient) {
    this.licenses$ = http
      .get<{ [name: string]: License }>('assets/licenses.json')
      .pipe(map((licenses) => Object.values(licenses)));
  }

  ngOnInit() {}
}
