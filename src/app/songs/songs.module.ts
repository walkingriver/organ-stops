import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongsPage } from './songs.page';

import { SongsPageRoutingModule } from './songs-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, SongsPageRoutingModule],
  declarations: [SongsPage],
})
export class SongsPageModule {}
