import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditArrangementPage } from './edit-arrangement.page';
import { AuthGuard } from './auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: EditArrangementPage,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditArrangementPageRoutingModule {}
