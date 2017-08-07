import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HymnPage } from "../hymn/hymn";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hymns = [
    { number: 1, title: 'First Hymn' },
    { number: 2, title: 'Second Hymn' },
    { number: 3, title: 'Third Hymn' }
  ];

  constructor(public navCtrl: NavController) {

  }

  nav(hymn) {
    this.navCtrl.push(HymnPage, hymn);
  }

}
