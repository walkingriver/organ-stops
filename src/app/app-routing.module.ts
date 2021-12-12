import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'songs',
    loadChildren: () =>
      import('./songs/songs.module').then((m) => m.SongsPageModule),
  },
  {
    path: 'terms',
    loadChildren: () =>
      import('./terms/terms.module').then((m) => m.TermsPageModule),
  },
  {
    path: 'privacy',
    loadChildren: () =>
      import('./privacy/privacy.module').then((m) => m.PrivacyPageModule),
  },
  {
    path: 'acknowledgements',
    loadChildren: () =>
      import('./acknowledgements/acknowledgements.module').then(
        (m) => m.AcknowledgementsPageModule
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then((m) => m.UserPageModule),
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('./edit-arrangement/edit-arrangement.module').then(
        (m) => m.EditArrangementPageModule
      ),
  },
  {
    path: '',
    redirectTo: 'songs',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
