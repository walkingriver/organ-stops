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
import { OrganStops } from '../../app/organ-stops';
import { EditStopsPage } from '../edit-stops/edit-stops';

@Component({
  selector: 'page-edit-hymn',
  templateUrl: 'edit-hymn.html',
})
export class EditHymnPage {
  user: firebase.User;
  form: FormGroup;
  hymn: Hymn;

  constructor(public viewCtrl: ViewController, public modal: ModalController,
    fb: FormBuilder, private db: AngularFireDatabase, private afAuth: AngularFireAuth,
    navParams: NavParams) {
    afAuth.authState.subscribe(user => {
      this.user = user;
    });

    this.form = fb.group({
      number: ['', [Validators.required, CustomValidators.min(1)]],
      title: ['', Validators.required],
      pedal: defaults.pedal,
      swell: defaults.swell,
      great: defaults.great,
      general: defaults.general
    });

    if (navParams.data.hymn) {
      this.hymn = navParams.data.hymn;
      this.form.patchValue({
        number: this.hymn.number,
        title: this.hymn.title
      });
    }
  }

  displayStops(field: string, stops: OrganStops) {
    const modal = this.modal.create(EditStopsPage, {
      title: field,
      stops: stops
    });
    modal.onDidDismiss((data, role) => {
      if (data) {
        this.form.patchValue({
          [field]: data
        });
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
      pedal: this.form.value.pedal,
      swell: this.form.value.swell,
      great: this.form.value.great,
      general: this.form.value.general
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
      pedal: this.form.value.pedal,
      swell: this.form.value.swell,
      great: this.form.value.great,
      general: this.form.value.general
    };

    this.db.list(`/hymns/${this.hymn.$key}/arrangements`).push(arrangement);
    this.viewCtrl.dismiss();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
