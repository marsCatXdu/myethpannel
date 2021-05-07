import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarsearchSortPopoverPage } from './carsearch-sort-popover.page';

const routes: Routes = [
  {
    path: '',
    component: CarsearchSortPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarsearchSortPopoverPageRoutingModule {}
