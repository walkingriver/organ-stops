import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs/behaviorsubject';
import { Observable } from 'rxjs/observable';

import { HymnPage } from '../hymn/hymn';
import { Hymn } from '../../app/hymn';
import { CreateHymnPage } from '../create-hymn/create-hymn';
import { UserPage } from '../user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: firebase.User;
  hymns: FirebaseListObservable<Hymn[]>;

  sort = 'number';
  sortSubject = new BehaviorSubject(this.sort);

  constructor(public navCtrl: NavController, private modalCtrl: ModalController,
    private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      this.user = user;
    });

    this.hymns = db.list('/hymns', {
      query: {
        orderByChild: this.sortSubject as Observable<string>
      }
    });
  }

  async newHymn() {
    if (this.user) {
      const modal = this.modalCtrl.create(CreateHymnPage);
      modal.present();
    } else {
      this.navCtrl.push(UserPage);
    }
  }

  viewHymn(hymn: Hymn) {
    this.navCtrl.push(HymnPage, hymn);
  }

  sortBy(prop: string) {
    this.sortSubject.next(prop);
  }
}
