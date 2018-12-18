import { Component, OnInit } from '@angular/core';
import {NavigationService} from '../_core/navigation.service';

@Component({
  moduleId: module.id
  ,selector: 'home'
  ,templateUrl: './home.component.html'
  ,styleUrls: ['./home.component.scss', '../app.component.scss']
  ,providers:[NavigationService]
})
export class HomeComponent implements OnInit {
   profile: any;
   firstImage: string;

   constructor(private Nav: NavigationService){
     this.firstImage = '/assets/images/matrix_learning.gif';
   }

   ngOnInit() {
     this.Nav.initRootPath();
   }

}
