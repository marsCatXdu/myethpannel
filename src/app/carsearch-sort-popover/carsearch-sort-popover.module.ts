import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarsearchSortPopoverPageRoutingModule } from './carsearch-sort-popover-routing.module';

import { CarsearchSortPopoverPage } from './carsearch-sort-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarsearchSortPopoverPageRoutingModule
  ],
  declarations: [CarsearchSortPopoverPage]
})
export class CarsearchSortPopoverPageModule {}
