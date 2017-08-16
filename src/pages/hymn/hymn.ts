import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

import { Hymn } from '../../app/hymn';
import { OrganStops } from '../../app/organ-stops';
import { StopsPage } from '../stops/stops';
import { EditHymnPage } from '../edit-hymn/edit-hymn';
import { Arrangement } from '../../app/arrangement';

@Component({
  selector: 'page-hymn',
  templateUrl: 'hymn.html',
})
export class HymnPage {
  hymn: Hymn;
  arrangements: FirebaseListObservable<Arrangement[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private modalCtrl: ModalController, db: AngularFireDatabase) {
    this.hymn = navParams.data;
    this.arrangements = db.list(`/hymns/${this.hymn.$key}/arrangements`);
  }

  displayStops(title: string, stops: OrganStops) {
    this.navCtrl.push(StopsPage, {
      title: title,
      stops: stops
    });
  }

  customize() {
    const modal = this.modalCtrl.create(EditHymnPage, { hymn: this.hymn });
    modal.present();
  }
}
