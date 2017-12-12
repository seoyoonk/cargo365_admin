import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private rest:RestProvider) {
    
  }
  ionViewDidLoad(){
    
    location.href= this.rest.apiUrl;
  }

}
