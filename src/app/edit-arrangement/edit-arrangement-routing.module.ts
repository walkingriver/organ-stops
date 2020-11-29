import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { EditArrangementPage } from './edit-arrangement.page';

const routes: Routes = [
  {
    path: '',
    component: EditArrangementPage,
    ...canActivate(() => redirectUnauthorizedTo(['/user'])),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditArrangementPageRoutingModule {}
