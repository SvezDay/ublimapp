import { Injectable }                  from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot
                                     } from '@angular/router';
import {Observable}                    from 'rxjs/Rx';
import {AuthenticationService}         from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
      private router: Router,
      private auth: AuthenticationService
    ) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
      let cx = this.auth.isLogged();
      // console.log('canActivate', cx)
      if(!cx){
        this.router.navigate(['./authenticate'])
      }
      return cx

      // if(this.auth.isLogged()){
      //   return true;
      // }
      // this.router.navigate(['./authenticate'])
      // return false

    }

}
