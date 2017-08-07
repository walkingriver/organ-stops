import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { Hymn } from '../../app/hymn';
import * as defaults from '../../app/defaults';

@Component({
  selector: 'page-create-hymn',
  templateUrl: 'create-hymn.html',
})
export class CreateHymnPage {
  hymn: Hymn;
  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder) {
    this.form = fb.group({
      number: [0, [Validators.required, CustomValidators.min(1)]],
      title: ['', Validators.required],
      pedal: defaults.pedal,
      swell: defaults.swell,
      great: defaults.great,
      general: defaults.general
    });
  }
}
