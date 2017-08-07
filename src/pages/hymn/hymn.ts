import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Hymn } from '../../app/hymn';
import { OrganStops } from '../../app/organ-stops';
import { StopsPage } from '../stops/stops';

@Component({
  selector: 'page-hymn',
  templateUrl: 'hymn.html',
})
export class HymnPage {
  hymn: Hymn;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.hymn = navParams.data;
  }

  displayStops(stops: OrganStops) {
    this.navCtrl.push(StopsPage, stops);
  }
}
