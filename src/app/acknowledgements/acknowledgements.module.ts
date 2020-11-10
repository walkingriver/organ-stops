import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { AcknowledgementsPageRoutingModule } from './acknowledgements-routing.module';
import { AcknowledgementsPage } from './acknowledgements.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcknowledgementsPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [AcknowledgementsPage],
})
export class AcknowledgementsPageModule {}
