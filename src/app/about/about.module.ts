import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutPage } from './about.page';
import { AboutPageRoutingModule } from './about-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, AboutPageRoutingModule],
  declarations: [AboutPage],
})
export class AboutPageModule {}
