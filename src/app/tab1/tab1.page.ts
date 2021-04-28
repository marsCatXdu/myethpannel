import { Component } from '@angular/core';
import { SearchParamsPopoverComponent } from '../search-params-popover/search-params-popover.component'
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  pageState: number;  // 0:init; 1:ok; -1:network err;  2:no results
  searchParams: any;  // 搜索参数
  resultList: any;

  constructor(private popCtrl: PopoverController) {
    this.pageState = 0;
    this.searchParams = {
      keySearch: true,
      fuzzySearch: false
    }
  }

  getResultList() {
    this.resultList = [{
      title: "1",
      content: "111"
    }, {
      title: "2",
      content: "222"
    }, {
      title: "3",
      content: "333"
    }, {
      title: "4",
      content: "444"
    }, {
      title: "5",
      content: "555"
    }, {
      title: "6",
      content: "666"
    }];
  }

  async presentPopover(ev: any) {
    console.log(ev);
    const popover = await this.popCtrl.create({
      component: SearchParamsPopoverComponent,
      event: ev,
      translucent: true,
      animated: true,
      mode: "ios",
      cssClass: "customPopover",
      componentProps: {
        //skuS: skuStr
      }
    });
    await popover.present();
    await popover.onWillDismiss().then(res=>{
    });
  }



}
