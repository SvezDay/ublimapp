import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard}            from './_core/auth.guard';
// import {GamesModule} from './games/games.module';

import {HomeComponent} from './home/home.component';
import {AuthenticateComponent} from './authenticate/authenticate.component';
import {DocumentComponent} from './document/document.component';
// import {GamesComponent} from './games/games.component';
import { AdminComponent } from './admin/admin.component';
import { ActivityComponent } from './activity/activity.component';

// export function loadGames() {
//   return GamesModule;
// }

const routes: Routes = [
   {path: '', component: HomeComponent}
   ,{path: 'authenticate', component: AuthenticateComponent}
   ,{path: 'document', component: DocumentComponent, canActivate: [AuthGuard]} // AS ROOT DOCUMENT COMPONENT
   // ,{path: 'games', loadChildren: loadGames , canActivate: [AuthGuard]}
   // ,{path: 'games', loadChildren: ()=> GamesModule}
   // ,{path: 'games', loadChildren: GamesModule , canActivate: [AuthGuard]}
   ,{path: 'games', loadChildren: 'app/games/games.module#GamesModule'}
   ,{path: 'admin', component: AdminComponent, canActivate: [AuthGuard]}
   ,{path: 'activity', component: ActivityComponent, canActivate: [AuthGuard]}

   ,{path: '**', redirectTo: '', pathMatch: 'full'} // reload another component, in this case, the appComponent - Need to be modified
];

@NgModule({
   imports: [RouterModule.forRoot(routes)]
   ,exports: [RouterModule]
})
export class AppRoutingModule {}
