import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Hymn } from '../../app/hymn';
import { OrganStops } from '../../app/organ-stops';
import { StopsPage } from '../stops/stops';
import { EditHymnPage } from '../edit-hymn/edit-hymn';

@Component({
  selector: 'page-hymn',
  templateUrl: 'hymn.html',
})
export class HymnPage {
  hymn: Hymn;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private modalCtrl: ModalController) {
    this.hymn = navParams.data;
  }

  displayStops(title: string, stops: OrganStops) {
    this.navCtrl.push(StopsPage, {
      title: title,
      stops: stops
    });
  }

  customize() {
    const modal = this.modalCtrl.create(EditHymnPage, { hymn: this.hymn });
    modal.present();
  }
}
