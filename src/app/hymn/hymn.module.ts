import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HymnPageRoutingModule } from './hymn-routing.module';

import { HymnPage } from './hymn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HymnPageRoutingModule
  ],
  declarations: [HymnPage]
})
export class HymnPageModule {}
