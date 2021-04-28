import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'

declare let require :any;
const Web3 = require('web3');

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {

  web3: any;
  blockHeight: any;

  constructor(public http: HttpClient) {
    //this.web3 = new Web3("http://localhost:9000");
    //(<any>window).web3 = this.web3;
    this.blockHeight="NULL";
  }

  getBlock() {
    this.ajaxGet("getBlockHeight").then(res=>{
      this.blockHeight=res;
      console.log(this.blockHeight);
    });
  }

  setEtherBase() {
    this.ajaxGet("setEtherBase").then(res=>{
      console.log(res);
    });
  }

  ajaxGet(params) {
    return new Promise((resolve, reject) => {
      this.http.get("http://192.168.1.7:3000/api/"+params).subscribe((response: any) => {
        resolve(response);
      }, (err) => {
        reject(err);
      })
    })
  }

  ajaxPost(uid?: string, notename?: string) {
    let api: string = "http://localhost:8890";
    return new Promise((resolve, reject) => {
      this.http.post(api, null, { params: { jsonrpc: "2.0" } }).subscribe((response) => {
        resolve(response);
        console.log(resolve(response));
      }, (error) => {
        reject(error);
      });
    });
  }

}
