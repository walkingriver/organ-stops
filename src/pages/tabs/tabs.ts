import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { UserPage } from '../user/user';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabs = [
    { root: HomePage, title: 'Songs', icon: 'musical-notes' },
    { root: UserPage, title: 'User', icon: 'person' },
    { root: AboutPage, title: 'About', icon: 'information' }
  ];

  constructor() { }
}
