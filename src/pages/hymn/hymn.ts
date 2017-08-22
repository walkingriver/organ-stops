import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

import { Hymn } from '../../app/hymn';
import { OrganStop } from '../../app/organ-stop';
import { StopsPage } from '../stops/stops';
import { EditHymnPage } from '../edit-hymn/edit-hymn';
import { Arrangement } from '../../app/arrangement';
import { UserPage } from '../user/user';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-hymn',
  templateUrl: 'hymn.html',
})
export class HymnPage {
  hymn: Hymn;
  arrangements: FirebaseListObservable<Arrangement[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private modalCtrl: ModalController, db: AngularFireDatabase, private auth: AuthProvider) {
    this.hymn = navParams.data;
    this.arrangements = db.list(`/hymns/${this.hymn.$key}/arrangements`);
  }

  displayStops(title: string, stops: OrganStop[]) {
    this.navCtrl.push(StopsPage, {
      title: title,
      stops: stops
    });
  }

  listEnabledStops(stops: OrganStop[]) {
    const list = stops.filter(stop => stop.enabled)
      .map(stop => stop.name)
      .join(', ');
    return list;
  }

  customize(arrangement: Arrangement) {
    if (this.auth.isAuthenticated) {
      const modal = this.modalCtrl.create(EditHymnPage, {
        hymn: this.hymn,
        arrangement: arrangement
      });
      modal.present();
    } else {
      this.navCtrl.push(UserPage);
    }
  }
}
