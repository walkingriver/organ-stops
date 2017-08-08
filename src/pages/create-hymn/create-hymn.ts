import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { Hymn } from '../../app/hymn';
import * as defaults from '../../app/defaults';
import { OrganStops } from '../../app/organ-stops';
import { StopsPage } from '../stops/stops';

@Component({
  selector: 'page-create-hymn',
  templateUrl: 'create-hymn.html',
})
export class CreateHymnPage {
  form: FormGroup;

  constructor(public modal: ModalController, public navParams: NavParams, private fb: FormBuilder) {
    this.form = fb.group({
      number: ['', [Validators.required, CustomValidators.min(1)]],
      title: ['', Validators.required],
      pedal: defaults.pedal,
      swell: defaults.swell,
      great: defaults.great,
      general: defaults.general
    });
  }

  displayStops(field: string, stops: OrganStops) {
    const modal = this.modal.create(StopsPage, stops);
    modal.onDidDismiss((data, role) => {
      if (data) {
        this.form.patchValue({
          [field]: data
        });
      }
    });
    modal.present();
  }
}
