import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabelComponent } from './label.component';
import { ModelIconComponent } from './model-icon.component';
import { AutosizeDirective } from './autosize.directive';
import { ClickOutsideDirective } from './clickOutside.directive';
import { TabulationDirective } from './tabulation.directive';

@NgModule({
  imports: [
    CommonModule
  ]
  ,declarations: [
    LabelComponent
    , ModelIconComponent
    , AutosizeDirective
    , ClickOutsideDirective
    , TabulationDirective
  ]
  ,exports:[
    LabelComponent
    , ModelIconComponent
    , AutosizeDirective
    , ClickOutsideDirective
    , TabulationDirective
  ]
})
export class DirectivesModule { }
