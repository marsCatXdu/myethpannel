import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarDetailPopoverPage } from './car-detail-popover.page';

const routes: Routes = [
  {
    path: '',
    component: CarDetailPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarDetailPopoverPageRoutingModule {}
