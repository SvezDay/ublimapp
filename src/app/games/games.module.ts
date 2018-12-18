import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {DirectivesModule} from '../_directives/_directives.module';
// import { SocketIoModule} from 'ng-socket-io';

//SERVICE
// import {AuthGuard}            from '../_core/auth.guard';
// import {GamesSocketService} from './games.component'

import {GamesComponent} from './games.component';
import { RecallComponent } from './recall/recall.component';
import { RecallCardComponent } from './recall-card/recall-card.component';

// const routes: Routes = [
//   { path: '',component: GamesComponent,canActivate: [AuthGuard] }
//   ,{ path: 'recall', component: RecallComponent,canActivate: [AuthGuard] }
// ];
const routes: Routes = [
  { path: '',component: GamesComponent}
  ,{ path: 'recall', component: RecallComponent}
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
    , CommonModule
    , DirectivesModule
    , FormsModule
    // , SocketIoModule

  ],
  declarations: [
    GamesComponent
    , RecallComponent
    , RecallCardComponent
  ]
  // , providers:[GamesSocketService]
})
export class GamesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GamesModule
      ,providers: [
        // AuthGuard
      ]
    };
  }
}
