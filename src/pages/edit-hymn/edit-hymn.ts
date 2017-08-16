import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Hymn } from '../../app/hymn';
import { Arrangement } from '../../app/arrangement';
import * as defaults from '../../app/defaults';
import { OrganStop } from '../../app/organ-stop';
import { EditStopsPage } from '../edit-stops/edit-stops';

@Component({
  selector: 'page-edit-hymn',
  templateUrl: 'edit-hymn.html',
})
export class EditHymnPage {
  user: firebase.User;
  form: FormGroup;
  hymn: Hymn;

  pedal: OrganStop[];
  swell: OrganStop[];
  great: OrganStop[];
  general: OrganStop[];

  constructor(public viewCtrl: ViewController, public modal: ModalController,
    fb: FormBuilder, private db: AngularFireDatabase, private afAuth: AngularFireAuth,
    navParams: NavParams) {
    afAuth.authState.subscribe(user => {
      this.user = user;
    });

    // Make copies of the default stops
    this.pedal = defaults.pedal.slice();
    this.swell = defaults.swell.slice();
    this.great = defaults.great.slice();
    this.general = defaults.general.slice();

    this.form = fb.group({
      number: ['', [Validators.required, CustomValidators.min(1)]],
      title: ['', Validators.required]
    });

    if (navParams.data.hymn) {
      this.hymn = navParams.data.hymn;
      this.form.reset({
        number: this.hymn.number,
        title: this.hymn.title
      });
    }
  }

  displayStops(field: string, stops: OrganStop[]) {
    const modal = this.modal.create(EditStopsPage, {
      title: field,
      stops: stops
    });
    modal.onDidDismiss((data, role) => {
      if (data) {
        this[field] = data;
      }
    });
    modal.present();
  }

  save() {
    if (this.hymn) {
      this.saveArrangement();
    } else {
      this.saveHymn();
    }
  }

  saveHymn() {
    const hymn: Hymn = {
      number: Number(this.form.value.number),
      title: this.form.value.title,
      arrangements: []
    };
    const arrangement: Arrangement = {
      user: {
        id: this.user.uid,
        name: this.user.displayName
      },
      pedal: this.pedal,
      swell: this.swell,
      great: this.great,
      general: this.general
    };

    const id = this.db.list('/hymns').push(hymn).key;
    this.db.list(`/hymns/${id}/arrangements`).push(arrangement);

    this.viewCtrl.dismiss();
  }

  saveArrangement() {
    const arrangement: Arrangement = {
      user: {
        id: this.user.uid,
        name: this.user.displayName
      },
      pedal: this.pedal,
      swell: this.swell,
      great: this.great,
      general: this.general
    };

    this.db.list(`/hymns/${this.hymn.$key}/arrangements`).push(arrangement);
    this.viewCtrl.dismiss();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
