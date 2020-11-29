import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditArrangementPageRoutingModule } from './edit-arrangement-routing.module';
import { EditArrangementPage } from './edit-arrangement.page';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule, EditArrangementPageRoutingModule],
  declarations: [EditArrangementPage],
  exports: [EditArrangementPage],
})
export class EditArrangementPageModule {}
