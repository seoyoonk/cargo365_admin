import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';

import 'rxjs/add/operator/map';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  //public apiUrl = 'http://192.168.2.39:8081/';
  public apiUrl = 'https://admin.cargo365.co.kr/';
  
  constructor(public http: Http) {
    console.log('Hello RestProvider Provider');
  }
  appStart(phone:string, fcm:string)
  {
    let headers = new Headers();
    if(phone.startsWith("+82"))
    {
        phone = "0" + phone.substring(3,5) + "-" + phone.substring(5,phone.length-4) + "-" + phone.substring(phone.length-4,phone.length);
    }
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append("x-phone", phone);
    headers.append("x-fcm", fcm);
    
    return this.http.get( this.apiUrl + "/api/appStart.do", {headers : headers } ).map(
        res => res.json()
    )
    
  }
}