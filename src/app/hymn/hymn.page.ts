import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { defer, Observable, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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
    private alertController: AlertController
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

  remove(arrangement: { key: string; value: Arrangement }) {
    const role$ = defer(async () => {
      const alert = await this.alertController.create({
        header: 'Are you sure?',
        message:
          'Deleting the arrangement prevents other users from seeing it. This action is irreversible.',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
          },
          {
            text: 'Yes, delete it!',
            role: 'delete',
          },
        ],
      });
      await alert.present();

      const { role } = await alert.onDidDismiss();
      return role;
    });

    zip(role$, this.hymnKey$).subscribe(([role, hymnKey]) => {
      if (role === 'delete') {
        this.db
          .object(`/hymns/${hymnKey}/arrangements/${arrangement.key}`)
          .remove();
      }
    });
  }
}
