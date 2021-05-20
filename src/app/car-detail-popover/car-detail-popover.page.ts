import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-car-detail-popover',
  templateUrl: './car-detail-popover.page.html',
  styleUrls: ['./car-detail-popover.page.scss'],
})
export class CarDetailPopoverPage implements OnInit {

  @Input() carInfo;
  featureList: any;

  constructor() { }

  ngOnInit() {
    this.featureList=this.carInfo.f.split(" ");
    console.log(this.featureList);
  }

}
