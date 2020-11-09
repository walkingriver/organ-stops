import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { defer, Observable, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { EditArrangementPage } from '../edit-arrangement/edit-arrangement.page';
import { Arrangement, Hymn, OrganStop } from '../hymn';
import firebase from 'firebase/app';

@Component({
  selector: 'app-hymn',
  templateUrl: './hymn.page.html',
  styleUrls: ['./hymn.page.scss'],
})
export class HymnPage {
  hymnKey$: Observable<string>;
  user$: Observable<firebase.User>;
  hymn$: Observable<Hymn>;

  constructor(
    private db: AngularFireDatabase,
    auth: AngularFireAuth,
    route: ActivatedRoute,
    private modalController: ModalController
  ) {
    this.hymnKey$ = route.params.pipe(map((params) => params.key));
    this.user$ = auth.user;
    this.hymn$ = this.hymnKey$.pipe(
      switchMap((hymnKey) =>
        db.object<Hymn>(`/hymns/${hymnKey}`).valueChanges()
      )
    );
  }

  stopsFor(stops: OrganStop[]) {
    return stops
      .filter((stop) => stop.enabled)
      .map((stop) => stop.name)
      .join(', ');
  }

  customize(hymn: Hymn, arrangement: { key: string; value: Arrangement }) {
    const data$ = defer(async () => {
      const modal = await this.modalController.create({
        component: EditArrangementPage,
        componentProps: {
          hymn,
          arrangement: arrangement.value,
        },
      });
      await modal.present();

      const { data } = await modal.onDidDismiss<{ arrangement: Arrangement }>();
      return data?.arrangement;
    });

    zip(data$, this.user$, this.hymnKey$).subscribe(([data, user, hymnKey]) => {
      if (data && data.user.id === user.uid) {
        this.db
          .object(`/hymns/${hymnKey}/arrangements/${arrangement.key}`)
          .set(data);
      } else if (data) {
        data.user = { id: user.uid, name: user.displayName };
        this.db.list(`/hymns/${hymnKey}/arrangements`).push(data);
      }
    });
  }
}
