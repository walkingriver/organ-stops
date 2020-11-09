import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { IonSegment } from '@ionic/angular';
import { fromEvent, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Hymn } from '../hymn';

@Component({
  selector: 'app-songs',
  templateUrl: 'songs.page.html',
  styleUrls: ['songs.page.scss'],
})
export class SongsPage implements AfterViewInit {
  @ViewChild(IonSegment, { read: ElementRef }) sortSegment: ElementRef;
  hymns$: Observable<SnapshotAction<Hymn>[]>;

  constructor(private db: AngularFireDatabase) {}

  ngAfterViewInit() {
    this.hymns$ = fromEvent<CustomEvent>(
      this.sortSegment.nativeElement,
      'ionChange'
    ).pipe(
      map((event) => event.detail.value),
      startWith('number'),
      switchMap((sortBy) =>
        this.db
          .list<Hymn>('/hymns', (ref) => ref.orderByChild(sortBy))
          .snapshotChanges()
      )
    );
  }
}
