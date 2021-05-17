import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-search-param-popover',
  templateUrl: './search-param-popover.page.html',
  styleUrls: ['./search-param-popover.page.scss'],
})
export class SearchParamPopoverPage implements OnInit {

  @ViewChild('carAgeRadio')
  carAgeRadio: any;
  @Input() currentSearchParams;

  searchParam: any;
  featureArr: Array<number>=[0];

  constructor(private popCtrl: PopoverController) {

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log(this.currentSearchParams);
    this.searchParam=this.currentSearchParams;
    console.log(this.searchParam);
    this.carAgeRadio.value=this.searchParam.carAgeRange;
    this.featureArr = this.searchParam.featureArr;
    this.initFeatureButtons();
    this.initPriceRangeButtons();
  }

  ionViewWillLeave() {
    console.log(this.carAgeRadio);
  }

  /**
   * 修改价格区间
   * @param range 价格区间代号。
   * 0：不限；1：0-5,2：5-10,3：10-20;4：20-30;5：30以上
   */
  changePriceRange(range) {
    let buttonCollection = document.getElementsByName("priceRangeButton");
    for(let i=0; i<buttonCollection.length; i++) {
      buttonCollection[i].style.backgroundColor="#EEEEEE";
      buttonCollection[i].style.color="#000000";
    }
    document.getElementById("p"+range).style.backgroundColor="#FF6633";
    document.getElementById("p"+range).style.color="#FFFFFF";
    this.searchParam.priceRange=parseInt(range);
    console.log(this.searchParam);
  }

  initPriceRangeButtons() {
    document.getElementById("p"+this.searchParam.priceRange).style.backgroundColor="#FF6633";
    document.getElementById("p"+this.searchParam.priceRange).style.color="#FFFFFF";
  }

  onAgeChange() {
    this.searchParam.carAgeRange = this.carAgeRadio.value;
    console.log(this.searchParam);
  }

  initFeatureButtons() {
    let buttonCollection = document.getElementsByName("featureButton");
    if(this.featureArr[0]==1) {       // 如果只有第一个选中，就只把第一个涂红，其他的全保留灰色
      buttonCollection[0].style.backgroundColor="#FF6633";
      buttonCollection[0].style.color="#FFFFFF";
    } else {                          // 如果第一个没选中，就要重新涂色，从第二个开始考虑即可
      for(let i=1; i<12; i++) {
        if(this.featureArr[i]==1) {
          buttonCollection[i].style.backgroundColor="#FF6633";
          buttonCollection[i].style.color="#FFFFFF";
        }
      }
    }
  }

  changeFeature(featureId) {
    if(featureId==0) {      // 相当于选中不限，所有特性清零
      console.log("featureId==0");
      this.featureArr[0]=1;
      let buttonCollection = document.getElementsByName("featureButton");
      buttonCollection[0].style.backgroundColor="#FF6633";
      buttonCollection[0].style.color="#FFFFFF";
      for(let i=1; i<12; i++) {
        this.featureArr[i]=0
        buttonCollection[i].style.backgroundColor="#EEEEEE";
        buttonCollection[i].style.color="#000000";
      }
      this.searchParam.featureArr=this.featureArr;
    } else {
      console.log("featureId=="+featureId);
      let buttonCollection = document.getElementsByName("featureButton");
      this.featureArr[0]=0;
      buttonCollection[0].style.backgroundColor="#EEEEEE";
      buttonCollection[0].style.color="#000000";
      this.searchParam.featureArr=this.featureArr;
      if(this.featureArr[featureId]==0) {
        console.log("修改featureArr["+featureId+"]为1");
        this.featureArr[featureId]=1;
        buttonCollection[featureId].style.backgroundColor="#FF6633";
        buttonCollection[featureId].style.color="#FFFFFF";
        this.searchParam.featureArr=this.featureArr;
      } else {
        console.log("修改featureArr["+featureId+"]为0");
        this.featureArr[featureId]=0;
        buttonCollection[featureId].style.backgroundColor="#EEEEEE";
        buttonCollection[featureId].style.color="#000000";
        this.searchParam.featureArr=this.featureArr;
      }
    }
    console.log(this.searchParam);
  }

  async dismiss() {
    console.log("dismiss");
    this.popCtrl.dismiss(this.searchParam);
  }


}
