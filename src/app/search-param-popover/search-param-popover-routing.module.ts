import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchParamPopoverPage } from './search-param-popover.page';

const routes: Routes = [
  {
    path: '',
    component: SearchParamPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchParamPopoverPageRoutingModule {}
