import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContractDeployPageRoutingModule } from './contract-deploy-routing.module';

import { ContractDeployPage } from './contract-deploy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContractDeployPageRoutingModule
  ],
  declarations: [ContractDeployPage]
})
export class ContractDeployPageModule {}
