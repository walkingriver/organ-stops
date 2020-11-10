import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcknowledgementsPage } from './acknowledgements.page';

const routes: Routes = [
  {
    path: '',
    component: AcknowledgementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcknowledgementsPageRoutingModule {}
