import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { IonSegment, ModalController } from '@ionic/angular';
import { defer, Observable, zip } from 'rxjs';
import { first, map, startWith, switchMap } from 'rxjs/operators';
import { EditArrangementPage } from '../edit-arrangement/edit-arrangement.page';
import { Arrangement, Hymn } from '../hymn';
import firebase from 'firebase/app';
import * as defaults from '../defaults';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-songs',
  templateUrl: 'songs.page.html',
  styleUrls: ['songs.page.scss'],
})
export class SongsPage implements AfterViewInit {
  @ViewChild(IonSegment) sortSegment: IonSegment;
  hymns$: Observable<SnapshotAction<Hymn>[]>;
  user$: Observable<firebase.User>;

  constructor(
    private db: AngularFireDatabase,
    private modalController: ModalController,
    auth: AngularFireAuth
  ) {
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

  newSong() {
    const data$ = defer(async () => {
      const modal = await this.modalController.create({
        component: EditArrangementPage,
        componentProps: {
          hymn: {},
          arrangement: {
            pedal: defaults.pedal.slice(),
            swell: defaults.swell.slice(),
            great: defaults.great.slice(),
            general: defaults.general.slice(),
          } as Arrangement,
        },
      });
      await modal.present();

      const { data } = await modal.onDidDismiss<{
        hymn: Hymn;
        arrangement: Arrangement;
      }>();
      return data;
    });

    zip(data$, this.user$).subscribe(async ([data, user]) => {
      if (data) {
        const names = user.displayName.split(' ');
        data.arrangement.user = {
          id: user.uid,
          name: `${names[0]} ${names[names.length - 1][0]}.`,
        };
        const hymn = await this.db.list('/hymns').push(data.hymn);
        await hymn.child('/arrangements').push(data.arrangement);
      }
    });
  }

  updateNames() {
    this.db.list('/hymns').snapshotChanges().pipe(
      first(),
      switchMap(list => list)
    ).subscribe(hymn => {
      hymn.payload.child('/arrangements').forEach(arrangement => {
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
