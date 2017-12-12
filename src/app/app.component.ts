import { Component, ViewChild  } from '@angular/core';
import {   Platform , Nav} from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Sim } from '@ionic-native/sim';


import { RestProvider } from '../providers/rest';
declare var FCMPlugin;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = null;
  token:string = null;
  phone:string = null;
  @ViewChild(Nav) nav: Nav;
  constructor(private platform: Platform, statusBar: StatusBar, private splashScreen: SplashScreen , private sim:Sim,
     private rest:RestProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      this.sim.requestReadPermission();
      this.getPhoneNumber();
      this.getFCMToken() ;    
    });
  }

  getFCMToken() {
    console.log("cargo365: get fcm start");
    if (typeof (FCMPlugin) !== "undefined") {
      FCMPlugin.getToken(token => {
        console.log("cargo365: get fcm " + token);
        this.token = token;
        this.appStart();
      }
      );
    }
    else {
      alert("get push token fail");
      
    }
  }
   
  appStart()
  {
    if(this.phone==null || this.token==null)
    {
      return ;
    }
    this.rest.appStart(this.phone, this.token).subscribe((data)=>{
      //this.onFCM();
      if(data.error == 'y')
      {
        alert(data.error_msg);
        this.platform.exitApp();
      }
      else
      {
        location.href= this.rest.apiUrl;
        this.splashScreen.hide();
      }
      
      
      
    }, 
    (err)=>{
      alert("에러 " + err);
    })

  }
  getPhoneNumber() {
    console.log("cargo365: get phone number start");
    this.sim.getSimInfo().then(
      (info) => {

        if (info.phoneNumber) {
          console.log("cargo365: get phone number ok");
          
          let phone: string;
          if (info.phoneNumber.startsWith("+82")) {
            phone = "0" + info.phoneNumber.substring(3, 5) + "-" + info.phoneNumber.substring(5, info.phoneNumber.length - 4) + "-" + info.phoneNumber.substring(info.phoneNumber.length - 4, info.phoneNumber.length);
          }
          this.phone = phone;
          this.appStart();
        }
        else {

          setTimeout(this.getPhoneNumber(), 1000);
        }

      });
  }
}

