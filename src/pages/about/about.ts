import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LicenseProvider } from '../../providers/license/license';
import { License } from '../../app/license';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  licenses: License[];

  constructor(public navCtrl: NavController, private licenseProvider: LicenseProvider) { }

  async ionViewDidLoad() {
    this.licenses = await this.licenseProvider.getLicenses();
  }
}
