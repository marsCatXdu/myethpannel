import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Input } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contract-deploy',
  templateUrl: './contract-deploy.page.html',
  styleUrls: ['./contract-deploy.page.scss'],
})

export class ContractDeployPage implements OnInit {
  @Input() web3ep;

  inputBytecode: string;
  jsonabi: string;
  msgStatus: number;      // 当前状态。0 初始状态（啥也没有），1 已返回 contract address；
  contractAddr: string;
  contractObj: any;

  constructor(public http: HttpClient, public toastController: ToastController) {
    this.msgStatus=0;
  }

  ngOnInit() {}

  onBytecodeChange(event){
    this.inputBytecode=event.target.value;
    console.log(this.inputBytecode);
  }

  onAbiChange(event){
    this.jsonabi=event.target.value;
    console.log(this.jsonabi);
  }

  deployBytecode() {
    this.ajaxPost("postBytecode", {bytecode: this.inputBytecode}).then((res: any)=>{
      console.log(res);
      this.contractAddr=res.contractAddress;
      this.msgStatus=1;
      this.presentToast("部署成功，请填写 abi");
    });
  }

  setJsonABI() {
    let body = JSON.stringify({abi: this.jsonabi, contractAddr: this.contractAddr});
    this.httpPost("addContractByAbiAndContractAddr", body).then((res: any)=>{

    })
  }

  /**
   * 挖上几个块（ 不一定多少，暂定矿机开五秒，也可能跑疯了停不下来。。 ）
   */
  mineSomeBlocks() {
    this.ajaxGet("mineSomeBlocks").then(res=>{
      console.log(res);
    });
  }

  /**
   * @brief 向 web3ServerEndpoint 发送 Get 请求
   * @param params 实际调用的 api
   */
  ajaxGet(params) {
    return new Promise((resolve, reject) => {
      this.http.get("http://"+this.web3ep+"/api/"+params).subscribe((response: any) => {
        resolve(response);
      }, (err) => {
        reject(err);
      })
    })
  }

  ajaxPost(api: string, paramObj) {
    return new Promise((resolve, reject) => {
      this.http.post("http://"+this.web3ep+"/api/"+api, null, { params: paramObj }).subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
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


}
