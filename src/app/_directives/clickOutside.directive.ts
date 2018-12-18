import {Directive, ElementRef, Output, HostListener, EventEmitter} from "@angular/core";

@Directive({
  selector: '[ClickOutside]'
})
export class ClickOutsideDirective {
  public text: String;

  constructor(private _elementRef: ElementRef){}

  @Output()
  public clickOutside = new EventEmitter();

  @HostListener('document:click', ['$event:target'])
  public onClick(targetElement){
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if(!clickedInside){
      this.clickOutside.emit(null);
    }
  }



  // constructor(private _elementRef: ElementRef){}

  // @Output()
  // public clickOutside = new EventEmitter();
  //
  // @HostListener('document:click', ['$event:target'])
  // public onClick(targetElement){
  //   const clickedInside = this._elementRef.nativeElement.contains(targetElement);
  //   if(!clickedInside){
  //     this.clickOutside.emit(null);
  //   }
  // }

  // public clickOutside = new EventEmitter<MouseEvent>();
  //
  // @HostListener('document:click', ['$event', '$event.target'])
  // public onClick(event: MouseEvent, targetElement: HTMLElement): void {
  //     if (!targetElement) {
  //         return;
  //     }
  //
  //     const clickedInside = this._elementRef.nativeElement.contains(targetElement);
  //     if (!clickedInside) {
  //         this.clickOutside.emit(event);
  //     }
  // }
  // constructor(private eRef: ElementRef) {
  // }
  // @HostListener('document:click', ['$event'])
  // clickout(event) {
  //   if(this.eRef.nativeElement.contains(event.target)) {
  //     this.text = "clicked inside";
  //   } else {
  //     this.text = "clicked outside";
  //   }
  // }



}
