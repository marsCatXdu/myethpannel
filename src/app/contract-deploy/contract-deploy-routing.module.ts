import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractDeployPage } from './contract-deploy.page';

const routes: Routes = [
  {
    path: '',
    component: ContractDeployPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractDeployPageRoutingModule {}
