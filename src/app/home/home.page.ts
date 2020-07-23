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
	  
	  
	  ionViewWillEnter(){
		
			this.tokenProvider.GetPayload().then(value => {
				this.user = value;

				console.log(this.user);
			  });
		
			
			  this.restaurantProvider.GetAllRestaurants().subscribe(data => {
				
			
			 
			 
				this.shops = [];
				
				data.restaurants.forEach( snap =>{
					//this.params.data.items.push({
						
					
						
					this.shops.push({
						  id: snap._id,
                          title: snap.restaurantName,
                          subtitle:  snap.restaurantName,
                          backgroundImage: "https://res.cloudinary.com/funnyionic/image/upload/v" + snap.resImgVersion + "/" + snap.resImgId,
                          icon: "ios-arrow-dropright",
                          iconText: "ReadMore",
                          phonenumber: snap.restaurantPhone,
                          lat: snap.restaurantLat,
                          long: snap.restaurantLng,
                          description: snap.restaurantName,
                          firebase_url:"https://res.cloudinary.com/funnyionic/image/upload/v" + snap.resImgVersion + "/" + snap.resImgId,
                          address:snap.restaurantAddress,
                          category:snap.restaurantName,
                          images:snap.restaurantName,
                          img: snap.restaurantName,
                          info: snap.restaurantName,
                          mark: snap.restaurantName,
                          option: snap.restaurantName,
                          outlet: snap.restaurantName,
                          owner_id:snap.user._id,
                          market:true,
                          resImgVersion: snap.resImgVersion,
                          resImgId: snap.resImgId,
					});  
				  });
				  
				  console.log(this.shops);
				});
				
		
	}
	  ngOnInit(){
		  
		   
		  
	  }
	  
	   call(data){
	  
			  console.log(data);
			  this.callNumber.callNumber(data.phonenumber, true)
					.then(() =>{} )
					.catch(() =>{});
		}

}
