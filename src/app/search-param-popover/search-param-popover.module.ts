import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchParamPopoverPageRoutingModule } from './search-param-popover-routing.module';

import { SearchParamPopoverPage } from './search-param-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchParamPopoverPageRoutingModule
  ],
  declarations: [SearchParamPopoverPage]
})
export class SearchParamPopoverPageModule {}
