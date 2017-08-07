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
    { number: 1, title: 'First Hymn', pedal: {
      'Contra Violone 32': true,
      'Diapason 16': false,
      'Bourdon 16': false,
      'Lieblich Gedackt 16': false,
      'Octave 8': true,
      'Flute 8': false,
      'Choral Bass 4': false,
      'Mixture III': true,
      'Posaune 16': true,
      'Waldhorn 16': false,
      'French Trumpet 8': true,
      'Great to Pedal': false,
      'Swell to Pedal': false
    }, swell: {
      'Lieblich Gedackt 16': false,
      'Gedackt 8': true,
      'Viola Pomposa 8': true,
      'Viola Celeste 8': false,
      'Flute Celeste II 8': false,
      'Octave 4': false,
      'Traverse Flute 4': false,
      'Nasard 2 2/3': true,
      'Piccolo 2': true,
      'Tierce 1 3/5': false,
      'Fourniture IV': false,
      'Waldhorn 16': true,
      'Tromba 8': true,
      'Oboe 8': false,
      'Treumulant': false
    }, great: {
      'Violone 16': false,
      'Diapason 8': true,
      'Harmonic Flute 8': false,
      'Flute Celeste II 8': false,
      'Octave 4': false,
      'Spitzflöte 4': true,
      'Fifteenth 2': true,
      'Mixture IV': false,
      'French Trumpet 8': true,
      'Krummhorn 8': false,
      'Chimes': true,
      'Tremulant': false,
      'Swell to Great': false
    }, general: {
      'Bass Coupler': true,
      'Melody Coupler': false,
      'Alternate Tuning': false
    } },
    { number: 2, title: 'Second Hymn', pedal: {}, swell: {}, great: {}, general: {} },
    { number: 3, title: 'Third Hymn', pedal: {}, swell: {}, great: {}, general: {} }
  ];

  constructor(public navCtrl: NavController) {

  }

  nav(hymn: Hymn) {
    this.navCtrl.push(HymnPage, hymn);
  }

}
