import {Component, Input, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'ModelIcon'
  , template: `<span class="custm-bg-dark custm-ft-neutral">{{text | slice:0:4 | uppercase}}</span>`
  , styleUrls:['./model-icon.component.scss', '../app.component.scss']
})
export class ModelIconComponent implements OnInit{
  @Input() model: string;
  public text: string;
  constructor() { }

  ngOnInit(){
    this.text = this.model;
  }

}
