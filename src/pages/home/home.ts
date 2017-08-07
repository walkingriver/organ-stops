import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { HymnPage } from '../hymn/hymn';
import { Hymn } from '../../app/hymn';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hymns: FirebaseListObservable<Hymn[]>;

  constructor(public navCtrl: NavController, private db: AngularFireDatabase) {
    this.hymns = db.list('/hymns');
  }

  nav(hymn: Hymn) {
    this.navCtrl.push(HymnPage, hymn);
  }

}
