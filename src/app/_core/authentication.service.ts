import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
   private api: String;
   private secret = 'zertyuiopghjkfsddie345678098fjsdkqurqzeljml45678';
   constructor(private http: HttpClient) {
     if(environment.production){
       this.api = 'https://rudlabquickapi.herokuapp.com';
     }else{
       this.api = 'http://localhost:3200';
     }
   }

   authHeaders(header: HttpHeaders){
      header.append('x-access-token', localStorage.getItem('rudlab_token'));
   }

   login(creds) {
      return this.http.post(this.api + '/manual_authenticate', creds)
      .map((data: any) => {
         this.storeSession(data);
         this.storeData(data.data);
         return;
      });
   }

   register(creds){
     return this.http.post(`${this.api}/manual_register`, creds)
     .map((data: any) => {
       this.storeSession(data);
       this.storeData(data.data);
       return;
     })
   }

   storeSession(data){
     if (data && data.token) {
        localStorage.setItem('rudlab_token', data.token);
        localStorage.setItem('rudlab_exp', data.exp);
     }
   }

   storeData(data){
     for (var k in data){
       if(data.hasOwnProperty(k)){
         let key = 'rudlab_'+k;
         let value = data[k];
         localStorage.setItem(key, value);
       }
     }
   }

   logout() {
      // REMOVE ALL LOCAL DATA FROM RUDLAB
      for(let k in localStorage){
        if(localStorage.hasOwnProperty(k)){
          if(k.match(/(rudlab)/i) != null){
            localStorage.removeItem(k);
          };
        }
      }
   }

   isLogged(){
     let token = localStorage.getItem('rudlab_token');
     let exp = localStorage.getItem('rudlab_exp');
     let now = new Date().getTime();

      if(token && Number(exp) > now){
         return true;
      }
      return false;
   }
}
