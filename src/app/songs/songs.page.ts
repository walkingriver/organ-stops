import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { IonSegment, ModalController } from '@ionic/angular';
import { defer, fromEvent, Observable, zip } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
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
  @ViewChild(IonSegment, { read: ElementRef }) sortSegment: ElementRef;
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
        data.arrangement.user = { id: user.uid, name: user.displayName };
        const hymn = await this.db.list('/hymns').push(data.hymn);
        await hymn.child('/arrangements').push(data.arrangement);
      }
    });
  }
}
