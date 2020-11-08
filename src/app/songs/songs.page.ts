import { Component } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Hymn } from '../hymn';

@Component({
  selector: 'app-songs',
  templateUrl: 'songs.page.html',
  styleUrls: ['songs.page.scss'],
})
export class SongsPage {
  hymns$: Observable<SnapshotAction<Hymn>[]>;
  sortBy$ = new BehaviorSubject<string>('number');

  constructor(db: AngularFireDatabase) {
    this.hymns$ = this.sortBy$.pipe(
      switchMap((sortBy) =>
        db
          .list<Hymn>('/hymns', (ref) => ref.orderByChild(sortBy))
          .snapshotChanges()
      )
    );
  }
}
