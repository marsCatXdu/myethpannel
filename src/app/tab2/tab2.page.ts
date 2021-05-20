import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Input } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  sqlStr: string;
  web3ep: string;

  constructor(public http: HttpClient, public toastController: ToastController) {
    this.web3ep='localhost:3000';
  }

  execSql() {
    let body = JSON.stringify(
      {
        sql: this.sqlStr
      }
    );
    this.httpPost("executeSql", body).then((res:any)=>{
      console.log(res);
    })
  }

  /*
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
  */

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
