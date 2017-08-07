import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OrganStops } from '../../app/organ-stops';

@Component({
  selector: 'page-stops',
  templateUrl: 'stops.html',
})
export class StopsPage {
  stops: OrganStops;
  stopNames: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.stops = navParams.data;
    this.stopNames = Object.keys(this.stops);
  }
}
