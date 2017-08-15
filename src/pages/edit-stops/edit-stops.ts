import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { OrganStops } from '../../app/organ-stops';

@Component({
  selector: 'page-edit-stops',
  templateUrl: 'edit-stops.html',
})
export class EditStopsPage {
  title: string;
  stops: OrganStops;
  stopNames: string[];

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.title = navParams.data.title;

    this.stops = Object.assign({}, navParams.data.stops);
    delete this.stops.component;
    delete this.stops.opts;

    this.stopNames = Object.keys(this.stops);
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.viewCtrl.dismiss(this.stops);
  }
}
