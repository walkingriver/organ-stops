import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs/behaviorsubject';
import { Observable } from 'rxjs/observable';

import { HymnPage } from '../hymn/hymn';
import { Hymn } from '../../app/hymn';
import { EditHymnPage } from '../edit-hymn/edit-hymn';
import { UserPage } from '../user/user';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hymns: FirebaseListObservable<Hymn[]>;

  sort = 'number';
  sortSubject = new BehaviorSubject(this.sort);

  constructor(public navCtrl: NavController, private modalCtrl: ModalController,
    private db: AngularFireDatabase, private auth: AuthProvider) {
    this.hymns = db.list('/hymns', {
      query: {
        orderByChild: this.sortSubject as Observable<string>
      }
    });
  }

  newHymn() {
    if (this.auth.isAuthenticated) {
      const modal = this.modalCtrl.create(EditHymnPage);
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
