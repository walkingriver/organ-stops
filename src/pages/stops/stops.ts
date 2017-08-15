import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { OrganStops } from '../../app/organ-stops';

@Component({
  selector: 'page-stops',
  templateUrl: 'stops.html',
})
export class StopsPage {
  title: string;
  stops: OrganStops;
  stopNames: string[];

  constructor(public navParams: NavParams) {
    this.title = navParams.data.title;
    this.stops = Object.assign({}, navParams.data.stops);
    this.stopNames = Object.keys(this.stops);
  }
}
