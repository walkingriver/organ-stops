import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Hymn } from '../../app/hymn';


@Component({
  selector: 'page-hymn',
  templateUrl: 'hymn.html',
})
export class HymnPage {
  hymn: Hymn;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.hymn = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HymnPage');
  }

}
