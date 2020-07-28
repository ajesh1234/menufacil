import { Component , OnInit} from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { Values } from '../../providers/values';

import { CallNumber } from '@ionic-native/call-number/ngx';
import { AuthProvider } from '../../providers/auth/auth';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';
import { TokenProvider } from '../../providers/token/token';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  	public user: any;
	public shops: any;

  	constructor(
		public toastCtrl: ToastController, 
		private storage: Storage, 
		public navCtrl: NavController,
		public loadingCtrl: LoadingController,
		private callNumber: CallNumber,
		public values: Values,
		public router: Router,
		public authProvider: AuthProvider,
      	public restaurantProvider: RestaurantProvider,
      	public tokenProvider: TokenProvider) {}
	  
	  
  	ngOnInit(){

  	}
  	
  	ionViewWillEnter(){
		
		this.tokenProvider.GetPayload().then(value => {
			this.user = value;
		});
		
			
	  	this.restaurantProvider.GetAllRestaurants().subscribe(data => {
			 
			this.shops = [];
			data.details.data.forEach( snap =>{
				this.shops.push({
					  id: snap.merchant_id,
                      title: snap.restaurant_name,
                      backgroundImage: snap.logo,
                      address:snap.address,
                      cuisine:snap.cuisine
				});  
			});
		});
	}
	  
   	call(data){
		this.callNumber.callNumber(data.phonenumber, true).then(() =>{

		}).catch(() =>{

		});
	}
}
