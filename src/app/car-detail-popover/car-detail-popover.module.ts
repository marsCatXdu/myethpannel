import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarDetailPopoverPageRoutingModule } from './car-detail-popover-routing.module';

import { CarDetailPopoverPage } from './car-detail-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarDetailPopoverPageRoutingModule
  ],
  declarations: [CarDetailPopoverPage]
})
export class CarDetailPopoverPageModule {}
