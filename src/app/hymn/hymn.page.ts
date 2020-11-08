import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Hymn, OrganStop } from '../hymn';

@Component({
  selector: 'app-hymn',
  templateUrl: './hymn.page.html',
  styleUrls: ['./hymn.page.scss'],
})
export class HymnPage {
  hymn$: Observable<Hymn>;

  constructor(db: AngularFireDatabase, route: ActivatedRoute) {
    this.hymn$ = route.params.pipe(
      switchMap((params) =>
        db.object<Hymn>(`/hymns/${params.key}`).valueChanges()
      )
    );
  }

  stopsFor(stops: OrganStop[]) {
    return stops
      .filter((stop) => stop.enabled)
      .map((stop) => stop.name)
      .join(', ');
  }
}
