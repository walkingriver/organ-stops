import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { IonSegment } from '@ionic/angular';
import { Observable } from 'rxjs';
import { first, map, startWith, switchMap } from 'rxjs/operators';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Hymn } from '../hymn';

@Component({
  selector: 'app-songs',
  templateUrl: 'songs.page.html',
  styleUrls: ['songs.page.scss'],
})
export class SongsPage implements AfterViewInit {
  @ViewChild(IonSegment) sortSegment: IonSegment;
  hymns$: Observable<SnapshotAction<Hymn>[]>;
  user$: Observable<firebase.User>;

  constructor(private db: AngularFireDatabase, auth: AngularFireAuth) {
    this.user$ = auth.user;
  }

  ngAfterViewInit() {
    this.hymns$ = this.sortSegment.ionChange.pipe(
      map((event) => event.detail.value),
      startWith('number'),
      switchMap((sortBy) =>
        this.db
          .list<Hymn>('/hymns', (ref) => ref.orderByChild(sortBy))
          .snapshotChanges()
      )
    );
  }

  updateNames() {
    this.db
      .list('/hymns')
      .snapshotChanges()
      .pipe(
        first(),
        switchMap((list) => list)
      )
      .subscribe((hymn) => {
        hymn.payload.child('/arrangements').forEach((arrangement) => {
          const userNameNode = arrangement.child('/user/name');
          const names = userNameNode.val().split(' ');
          const maskedName = `${names[0]} ${names[names.length - 1][0]}.`;
          userNameNode.ref.set(maskedName);
          console.log(maskedName);
        });
        console.log('Done');
      });
  }
}
