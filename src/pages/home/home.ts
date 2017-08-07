import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HymnPage } from '../hymn/hymn';
import { Hymn } from '../../app/hymn';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hymns: Hymn[] = [
    { number: 1, title: 'First Hymn', pedal: {}, swell: {}, great: {}, general: {} },
    { number: 2, title: 'Second Hymn', pedal: {}, swell: {}, great: {}, general: {} },
    { number: 3, title: 'Third Hymn', pedal: {}, swell: {}, great: {}, general: {} }
  ];

  constructor(public navCtrl: NavController) {

  }

  nav(hymn: Hymn) {
    this.navCtrl.push(HymnPage, hymn);
  }

}
