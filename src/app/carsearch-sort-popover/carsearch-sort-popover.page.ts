import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-carsearch-sort-popover',
  templateUrl: './carsearch-sort-popover.page.html',
  styleUrls: ['./carsearch-sort-popover.page.scss'],
})
export class CarsearchSortPopoverPage implements OnInit {

  @ViewChild('sortRadio')
  sortRadio: any;
  @Input() currentOrderBy;

  constructor(private popCtrl: PopoverController) {
    
  }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    console.log(this.sortRadio);
    console.log(this.currentOrderBy);
    this.sortRadio.value = this.currentOrderBy;
  }

  radioHandler(orderBy, valueCh) {
    console.log(orderBy);
    this.dismiss(orderBy, valueCh);
  }

  async dismiss(value, valueCh) {
    this.popCtrl.dismiss(value, valueCh);
  }

}
