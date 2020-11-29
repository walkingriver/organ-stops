import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPage } from './user.page';

import { UserPageRoutingModule } from './user-routing.module';
import { FirebaseUIModule } from '../firebaseui-angular/firebaseui-angular-library.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    UserPageRoutingModule,
    FirebaseUIModule.forFeature({}),
  ],
  declarations: [UserPage],
})
export class UserPageModule {
}
