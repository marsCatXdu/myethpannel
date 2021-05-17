import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http'

import { CarsearchSortPopoverPage } from '../carsearch-sort-popover/carsearch-sort-popover.page'
import { SearchParamPopoverPage } from '../search-param-popover/search-param-popover.page'


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  pageState: number;  // 0:init; 1:ok; -1:network err;  2:no results
  resultList: any;
  web3ep: string;
  fuzzyName: string;
  orderBy: string;
  orderByCh: string;

  searchParams: any;  // 搜索参数
  featureArr: Array<number>=[0];


  constructor(private popCtrl: PopoverController, public http: HttpClient) {
    this.pageState = 0;

    this.featureArr[0]=1;
    for(let i=1; i<12; i++) {
      this.featureArr[i]=0;
    }
    this.searchParams={
      priceRange: 0,
      carAgeRange: {
        lower: 0,
        upper: 15
      },
      featureArr: this.featureArr
    }
    console.log(this.searchParams);
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
    let body = JSON.stringify(
      {
        fuzzyName: this.fuzzyName, 
        orderBy: orderBy
      });
    this.httpPost("getItemByNameFuzzy", body).then((res: any)=>{
      if(res=="]") {
        this.pageState = 2;
        return;
      } else {
        this.resultList=JSON.parse(res);
        console.log(this.resultList);
        if(this.resultList.length==0) {
          this.pageState = 2;
          return;
        }
      }
      this.pageState = 1;
    })
  }

  // TODO: 在搜索中加入参数对象
  searchByFuzzyNameWithOrderAndParam(orderBy, params) {
    this.pageState=3;
    let body = JSON.stringify(
      {
        fuzzyName: this.fuzzyName, 
        orderBy: orderBy,
        params: params
      });
    this.httpPost("getItemByNameFuzzyParams", body).then((res: any)=>{
      if(res=="]") {
        this.pageState = 2;
        return;
      } else {
        this.resultList=JSON.parse(res);
        console.log(this.resultList);
        if(this.resultList.length==0) {
          this.pageState = 2;
          return;
        }
      }
      this.pageState = 1;
    })
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
          this.searchByFuzzyNameWithOrderAndParam(this.orderBy, this.searchParams);
        }
        return;
      }
    });
  }

  async searchParamPopover(ev: any) {
    console.log(ev);
    const popover = await this.popCtrl.create({
      component: SearchParamPopoverPage,
      event: ev,
      translucent: false,
      animated: true,
      mode: "ios",
      cssClass: "customPopover",
      componentProps: {
        currentSearchParams: this.searchParams
      }
    });
    await popover.present();
    await popover.onWillDismiss().then((res: any)=>{
      if(res.data) {            // 这样是点了确定键回来，更新参数
        this.searchParams=res.data;
        console.log(this.searchParams);

        this.searchByFuzzyNameWithOrderAndParam(this.orderBy, this.searchParams);

      } else {                  // 点了背景回来，没有传回参数，不更新

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
