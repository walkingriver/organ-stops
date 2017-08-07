import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HymnPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-hymn',
  templateUrl: 'hymn.html',
})
export class HymnPage {
  hymn;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.hymn = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HymnPage');
  }

}
