import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/behaviorsubject';
import { Observable } from 'rxjs/observable';

import { HymnPage } from '../hymn/hymn';
import { Hymn } from '../../app/hymn';
import { EditHymnPage } from '../edit-hymn/edit-hymn';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hymns: FirebaseListObservable<Hymn[]>;

  sort = 'number';
  sortSubject = new BehaviorSubject(this.sort);

  constructor(public navCtrl: NavController, private db: AngularFireDatabase) {
    this.hymns = db.list('/hymns', {
      query: {
        orderByChild: this.sortSubject as Observable<string>
      }
    });
  }

  newHymn() {
    this.navCtrl.push(EditHymnPage);
  }

  viewHymn(hymn: Hymn) {
    this.navCtrl.push(HymnPage, hymn);
  }

  sortBy(prop: string) {
    this.sortSubject.next(prop);
  }
}
