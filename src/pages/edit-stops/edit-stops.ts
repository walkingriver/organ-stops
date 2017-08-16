import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { OrganStop } from '../../app/organ-stop';

@Component({
  selector: 'page-edit-stops',
  templateUrl: 'edit-stops.html',
})
export class EditStopsPage {
  title: string;
  stops: OrganStop[];

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.title = navParams.data.title;
    this.stops = navParams.data.stops;
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.viewCtrl.dismiss(this.stops);
  }
}
