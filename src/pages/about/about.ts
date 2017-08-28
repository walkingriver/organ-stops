import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LicenseProvider } from '../../providers/license/license';
import { License } from '../../app/license';
import { AcknowledgementsPage } from '../acknowledgements/acknowledgements';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  licenses: License[];

  constructor(public navCtrl: NavController) { }

  ionViewDidLoad() { }

  viewAcknowledgements() {
    this.navCtrl.push(AcknowledgementsPage);
  }
}
