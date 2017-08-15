import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Hymn } from '../../app/hymn';
import * as defaults from '../../app/defaults';
import { OrganStops } from '../../app/organ-stops';
import { EditStopsPage } from '../edit-stops/edit-stops';

@Component({
  selector: 'page-create-hymn',
  templateUrl: 'create-hymn.html',
})
export class CreateHymnPage {
  user: firebase.User;
  form: FormGroup;

  constructor(public viewCtrl: ViewController, public modal: ModalController,
    fb: FormBuilder, private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
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
  }

  ionViewCanEnter(): boolean {
    return this.user ? true : false;
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
    const hymn: Hymn = {
      number: this.form.value.number,
      title: this.form.value.title,
      arrangements: [{
        pedal: this.form.value.pedal,
        swell: this.form.value.swell,
        great: this.form.value.great,
        general: this.form.value.general
      }]
    };

    this.db.list('/hymns').push(hymn);
    this.viewCtrl.dismiss();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
