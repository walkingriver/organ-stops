import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { OrganStop } from '../../app/organ-stop';

@Component({
  selector: 'page-stops',
  templateUrl: 'stops.html',
})
export class StopsPage {
  title: string;
  stops: OrganStop[];

  constructor(public navParams: NavParams) {
    this.title = navParams.data.title;
    this.stops = navParams.data.stops;
  }
}
