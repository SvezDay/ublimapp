import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Response} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {catchError, map, tap} from 'rxjs/operators';
import {_throw} from 'rxjs/observable/throw';
import { environment } from '../../environments/environment';

import {AuthenticationService} from './authentication.service';
import {IntercomService} from './intercom.service';

import { Socket } from 'ng-socket-io';

@Injectable()
export class SocketService extends Socket {
  constructor(private auth: AuthenticationService, private socket: Socket){
    super({ url: environment.production ? 'https://rudlabquickapi.herokuapp.com' : 'http://localhost:3200', options: {} });
  }
  private handleError(error: any){
    console.log('error', error);
  }
  public connEmit(event:any, data:any):any{
    this.socket.emit(event, data)
  }
  public connOn(event:any):any{
    // this.socket(event, (data)=>{
    //   return data;
    // })
  }
  // query(verb, route, ...param) {
  //   if(verb == 'get' || verb == 'delete'){
  //     return this.http[verb](`${this.api}${route}`, {headers: this.jwt(...param)})
  //     .pipe(
  //       tap( response => {
  //         this.auth.storeSession(response);
  //         return response;
  //       }),
  //       catchError((e: any) => _throw(this.handleError(e)) )
  //       // catchError(this.handleError(e)) })
  //     );
  //   }else{
  //     return this.http[verb](`${this.api}${route}`, param[0] || {}, {headers: this.jwt()})
  //     .pipe(
  //       tap( response => {
  //         this.auth.storeSession(response);
  //         return response;
  //       }),
  //       catchError((e: any) => _throw(this.handleError(e)) )
  //     );
  //   }
  // };

  private jwt(...param) {
      let token = localStorage.getItem('rudlab_token');
      let headers = new HttpHeaders().set('x-access-token', token);
      if(param.length >= 1){
        for(let item in param[0]){
          headers = headers.set(item, param[0][item]);
        }
      }
      return headers;
  };

};
