import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { OrganStops } from '../../app/organ-stops';

@Component({
  selector: 'page-stops',
  templateUrl: 'stops.html',
})
export class StopsPage {
  stops: OrganStops;
  stopNames: string[];

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.stops = Object.assign({}, navParams.data);
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
