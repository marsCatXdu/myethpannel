import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http'

import { SearchParamsPopoverComponent } from '../search-params-popover/search-params-popover.component';
import { CarsearchSortPopoverPage } from '../carsearch-sort-popover/carsearch-sort-popover.page'


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  pageState: number;  // 0:init; 1:ok; -1:network err;  2:no results
  searchParams: any;  // 搜索参数
  resultList: any;
  web3ep: string;
  fuzzyName: string;
  orderBy: string;
  orderByCh: string;


  constructor(private popCtrl: PopoverController, public http: HttpClient) {
    this.pageState = 0;
    this.searchParams = {
      keySearch: true,
      fuzzySearch: false
    };
    this.orderBy = "default";
    this.orderByCh = "默认排序";
    this.web3ep='localhost:3000';
  }


  searchByFuzzyName() {
    this.pageState=3;
    let body = JSON.stringify({fuzzyName: this.fuzzyName});
    this.httpPost("getItemByNameFuzzy", body).then((res: any)=>{
      this.resultList=JSON.parse(res);
      console.log(this.resultList);
      if(this.resultList.length==0) {
        this.pageState = 2;
        return;
      }
      this.pageState = 1;
    })
  }


  searchByFuzzyNameWithOrder(orderBy) {
    this.pageState=3;
    let body = JSON.stringify({fuzzyName: this.fuzzyName, orderBy: orderBy});
    this.httpPost("getItemByNameFuzzy", body).then((res: any)=>{
      this.resultList=JSON.parse(res);
      console.log(this.resultList);
      if(this.resultList.length==0) {
        this.pageState = 2;
        return;
      }
      this.pageState = 1;
    })
  }


  async presentPopover(ev: any) {
    console.log(ev);
    const popover = await this.popCtrl.create({
      component: SearchParamsPopoverComponent,
      event: ev,
      translucent: false,
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


  async presentCarSortPopover(ev: any) {
    console.log(ev);
    const popover = await this.popCtrl.create({
      component: CarsearchSortPopoverPage,
      event: ev,
      translucent: false,
      animated: true,
      mode: "ios",
      //cssClass: "customPopover",
      componentProps: {
        currentOrderBy: this.orderBy
      }
    });
    await popover.present();
    await popover.onWillDismiss().then((res: any)=>{
      console.log(res);
      if(!res.data||!this.fuzzyName) {
        return;
      } else {
        if(this.fuzzyName!="") {
          this.orderBy = res.data;
          this.orderByCh = res.role;
          this.searchByFuzzyNameWithOrder(this.orderBy);
        }
        return;
      }
    });
  }


  httpPost(api: string, paramObj) {
    return new Promise((resolve, reject) => {
      this.http.post("http://"+this.web3ep+"/api/"+api, paramObj).subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }



}
