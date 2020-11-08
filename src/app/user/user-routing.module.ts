import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: '',
    component: UserPage,
  },
  {
    path: 'terms',
    loadChildren: () =>
      import('../terms/terms.module').then((m) => m.TermsPageModule),
  },
  {
    path: 'privacy',
    loadChildren: () =>
      import('../privacy/privacy.module').then((m) => m.PrivacyPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
