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
    this.stopNames = Object.keys(this.stops).filter(key => key !== 'component' && key !== 'opts');
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.viewCtrl.dismiss(this.stops);
  }
}
