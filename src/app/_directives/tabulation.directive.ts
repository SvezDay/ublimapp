import {Directive, ElementRef, Output, Input, HostListener, EventEmitter, Renderer, OnChanges} from "@angular/core";

@Directive({
  selector: 'span[tabulation]'
  , host: {
    '(click)':'onClick($event.target)'
  }
  , inputs: ['index_list:index_list']
})
export class TabulationDirective {
  coef: number = 20;
  padding: number;
  index_list: number;
  tabulation:any;
  element: any;
  render: any;


  constructor(private _elementRef: ElementRef, private renderer: Renderer){
      setTimeout(()=>{

        if(!this.index_list) {
          this.padding = 0;
          renderer.setElementStyle(_elementRef.nativeElement, 'padding-left', `${this.padding}px`);
        }else{
          this.padding = this.coef * this.index_list;
          renderer.setElementStyle(_elementRef.nativeElement, 'padding-left', `${this.padding}px`);
        }
        this.element = _elementRef;
        this.render = renderer;
      }, 0)

    }

  // ngOnChanges(changes){ }
  onClick(spn){ }


}
