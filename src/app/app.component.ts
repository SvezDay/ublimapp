import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from './_core/authentication.service';
import {IntercomService} from './_core/intercom.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';

import {NavigationService} from './_core/navigation.service';

@Component({
  selector: 'app-root'
  , templateUrl: './app.component.html'
  , styleUrls: ['./app.component.scss']
  , providers:[NavigationService]
})
export class AppComponent {

  title = 'app';
  // template: string =`<img src="http://pa1.narvii.com/5722/2c617cd9674417d272084884b61e4bb7dd5f0b15_hq.gif" />`;
  constructor(
    private Router: Router
    , public Auth: AuthenticationService
    , private SpinnerService: Ng4LoadingSpinnerService
    , private Intercom: IntercomService
    , private Nav: NavigationService) {

    Intercom.dataEmitted.subscribe(data=>{
      console.log('AppCompent receive data from intercom', data)
    })
    Intercom.spinnerOnEmitted.subscribe(()=>{this.SpinnerService.show()})
    Intercom.spinnerOffEmitted.subscribe(()=>{this.SpinnerService.hide()})

  }


}
