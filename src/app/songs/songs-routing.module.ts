import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongsPage } from './songs.page';

const routes: Routes = [
  {
    path: '',
    component: SongsPage,
  },
  {
    path: ':key',
    loadChildren: () =>
      import('../hymn/hymn.module').then((m) => m.HymnPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SongsPageRoutingModule {}
