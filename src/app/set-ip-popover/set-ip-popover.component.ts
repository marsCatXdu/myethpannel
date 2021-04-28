import { Component, OnInit, Input } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-set-ip-popover',
  templateUrl: './set-ip-popover.component.html',
  styleUrls: ['./set-ip-popover.component.scss'],
})
export class SetIpPopoverComponent implements OnInit {

  @ViewChild('input1') input1: ElementRef;
  @Input() value;
  inputip: string;

  constructor(private popCtrl: PopoverController, 
              public toastController: ToastController, 
              public http: HttpClient) {
      
  
              }

  ngOnInit() {}

  getValue() {
    console.log(this.input1);
  }

  onInputChange(event){
    this.inputip=event.target.value;
  }

  /**
   * @brief 进行连接测试，连接成功则直接退出并返回值。失败则给出提示
   */
  async dismiss() {
    this.presentToast("进行 RPC 连接测试...");
    // 其实有回应了而且没报错就算是成功
    // 不需要进行额外的判定
    this.ajaxGet(this.inputip, "ping").then(res=>{
      console.log(res);
      console.log(this.inputip);
      this.presentToast("连接成功！");
      this.popCtrl.dismiss(this.inputip);
    }).catch(err=>{
      console.log(err);
      this.presentToast("无法连接，请重新设置");
    });

  }

  /**
   * @brief 展示 Toast
   * @param message 要显示出来的文本信息 
   * @param position 要显示出来的位置，分 top、middle、bottom. 默认 middle 
   * @param duration 要显示的时间（毫秒）
   */
  async presentToast(message: string, position: string = "middle", duration: number = 2000) {
    if(position=="top") {
      const toast = await this.toastController.create({
        message: message,
        position: "top",
        duration: duration
      });
      toast.present();
    } else if(position=="bottom") {
      const toast = await this.toastController.create({
        message: message,
        position: "bottom",
        duration: duration
      });
      toast.present();
    } else {
      const toast = await this.toastController.create({
        message: message,
        position: "middle",
        duration: duration
      });
      toast.present();
    }
  }

  /**
   * @brief 向目标端点发送 Get 请求
   * @param endpoint 形如 "ip:port"
   * @param params 实际调用的 api
   */
  ajaxGet(endpoint, params) {
    return new Promise((resolve, reject) => {
      this.http.get("http://" + endpoint + "/api/" + params).subscribe((response: any) => {
        resolve(response);
      }, (err) => {
        reject(err);
      })
    })
  }

}
