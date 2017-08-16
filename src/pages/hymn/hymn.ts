import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NavController, NavParams, ModalController, Slides } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Hymn } from '../../app/hymn';
import { OrganStop } from '../../app/organ-stop';
import { StopsPage } from '../stops/stops';
import { EditHymnPage } from '../edit-hymn/edit-hymn';
import { Arrangement } from '../../app/arrangement';
import { UserPage } from '../user/user';

@Component({
  selector: 'page-hymn',
  templateUrl: 'hymn.html',
})
export class HymnPage {
  hymn: Hymn;
  arrangements: FirebaseListObservable<Arrangement[]>;
  user: firebase.User;

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private modalCtrl: ModalController, db: AngularFireDatabase, afAuth: AngularFireAuth) {
    this.hymn = navParams.data;
    this.arrangements = db.list(`/hymns/${this.hymn.$key}/arrangements`);

    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  displayStops(title: string, stops: OrganStop[]) {
    this.navCtrl.push(StopsPage, {
      title: title,
      stops: stops
    });
  }

  customize() {
    if (this.user) {
      const modal = this.modalCtrl.create(EditHymnPage, { hymn: this.hymn });
      modal.present();
    } else {
      this.navCtrl.push(UserPage);
    }
  }
}
