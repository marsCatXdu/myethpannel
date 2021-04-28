import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { PopoverController } from '@ionic/angular';
import { SetIpPopoverComponent } from '../set-ip-popover/set-ip-popover.component'


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
  web3ServerEndpoint: any;
  isConnectedToRPC: boolean;

  constructor(public http: HttpClient, private popCtrl: PopoverController) {
    this.blockHeight="NULL";
    this.isConnectedToRPC=false;
  }

  pingWeb3Server() {
    this.ajaxGet("ping").then(res=>{
      console.log(res);
    });
  }

  /**
   * @brief 弹出设置 RPC 端点的 Popover
   * @param ev $event
   */
  setWeb3ServerIP(ev: any) {
    this.presentPopover(ev);
  }

  /**
   * 获取块高
   */
  getBlock() {
    this.ajaxGet("getBlockHeight").then(res=>{
      this.blockHeight=res;
      console.log(this.blockHeight);
    });
  }

  /**
   * 获取当前节点的 etherbase
   */
  setEtherBase() {
    this.ajaxGet("setEtherBase").then(res=>{
      console.log(res);
    });
  }

  /**
   * @brief 向 web3ServerEndpoint 发送 Get 请求
   * @param params 实际调用的 api
   */
  ajaxGet(params) {
    return new Promise((resolve, reject) => {
      this.http.get("http://"+this.web3ServerEndpoint+"/api/"+params).subscribe((response: any) => {
        resolve(response);
      }, (err) => {
        reject(err);
      })
    })
  }

  async presentPopover(ev: any) {
    console.log(ev);
    const popover = await this.popCtrl.create({
      component: SetIpPopoverComponent,
      event: ev,
      translucent: false,
      animated: true,
      mode: "md",
      cssClass: "customPopover",
      componentProps: {
        value: "testVal"
      }
    });
    await popover.present();
    await popover.onWillDismiss().then(res=>{
      console.log(res);
      if(!res.data) {   // 如果没有返回值
        console.log("undef");
      } else {
        this.web3ServerEndpoint=res.data;
        this.isConnectedToRPC=true;
      }
    });
  }

}
