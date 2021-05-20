import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'contract-deploy',
    loadChildren: () => import('./contract-deploy/contract-deploy.module').then( m => m.ContractDeployPageModule)
  },
  {
    path: 'carsearch-sort-popover',
    loadChildren: () => import('./carsearch-sort-popover/carsearch-sort-popover.module').then( m => m.CarsearchSortPopoverPageModule)
  },
  {
    path: 'search-param-popover',
    loadChildren: () => import('./search-param-popover/search-param-popover.module').then( m => m.SearchParamPopoverPageModule)
  },
  {
    path: 'car-detail-popover',
    loadChildren: () => import('./car-detail-popover/car-detail-popover.module').then( m => m.CarDetailPopoverPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
