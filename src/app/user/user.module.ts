import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserPage } from './user.page';

import { UserPageRoutingModule } from './user-routing.module';
import { FirebaseUIModule } from '../firebaseui-angular/firebaseui-angular-library.module';

let globalRouter: Router;

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    UserPageRoutingModule,
    FirebaseUIModule.forFeature({
      tosUrl: () => globalRouter.navigate(['/tabs/user/terms']),
      privacyPolicyUrl: () => globalRouter.navigate(['/tabs/user/privacy']),
    }),
  ],
  declarations: [UserPage],
})
export class UserPageModule {
  constructor(router: Router) {
    globalRouter = router;
  }
}
