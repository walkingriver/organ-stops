import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LicenseProvider } from '../../providers/license/license';
import { License } from '../../app/license';
import { AcknowledgementsPage } from '../acknowledgements/acknowledgements';
import { PrivacyPage } from '../privacy/privacy';
import { TermsPage } from '../terms/terms';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  licenses: License[];

  constructor(public navCtrl: NavController) { }

  ionViewDidLoad() { }

  viewTerms() {
    this.navCtrl.push(TermsPage);
  }

  viewPrivacyPolicy() {
    this.navCtrl.push(PrivacyPage);
  }

  viewAcknowledgements() {
    this.navCtrl.push(AcknowledgementsPage);
  }
}
