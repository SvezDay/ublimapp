import {Component, Input, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import {Common} from '../_models/common.data';

@Component({
  selector: 'Label'
  , template: `<span>{{designation}}</span>`
})
export class LabelComponent implements OnInit{
  @Input() code_label: number;
  public designation: string;
  private common: Common;
  constructor() {
    this.common = new Common();
  }

  ngOnInit(){

    // console.log("this.labelInst.getLabelByCode(this.code_label)", this.common.getLabelByCode(this.code_label))
    // console.log("label directive code_label", this.code_label)
    this.designation = this.common.getLabelByCode(this.code_label).designation;
    // let ac = (this.code_label+"").split(".");
    // let code_type = Number.parseInt(ac[0]);
    // let code_list = Number.parseInt(ac[1]);
    // this.designation = labelList["note"].find(x=> x.code==code_type).list.find(x => x.code==code_list).designation;
  }
  ngOnChanges(changes: SimpleChanges){
    // console.log('==================== On changes directive label', changes)
    this.designation = this.common.getLabelByCode(changes.code_label.currentValue).designation;
  }

}
