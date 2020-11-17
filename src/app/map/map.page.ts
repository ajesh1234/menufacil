import { Component, OnInit } from '@angular/core';
import { Platform , LoadingController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Values } from '../../providers/values';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { OrderProvider } from '../../providers/order/order';
import { TokenProvider } from '../../providers/token/token';
import { UsersProvider } from '../../providers/users/users';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

    public user: any;
  public shops: any;
  lat: any;
  lng: any;

  constructor(
    public router: Router,
    public geo:Geolocation,
    public platform: Platform, 
    public tokenProvider: TokenProvider,
    public orderProvider: OrderProvider,
    public storage : Storage,
    public usersProvider: UsersProvider,
    public restaurantProvider: RestaurantProvider) { 
	
    let that = this;
    let options = {
	    frequency: 3000,
	    enableHighAccuracy: true
		};
		
		this.geo.getCurrentPosition(options).then(resp =>{
			let body;

                this.storage.get('auth-token').then(token => {
                    if(token){
                      this.tokenProvider.GetPayload().then(value => {
                        this.user = value;

                        body = {
                          lat: resp.coords.latitude,
                          lng: resp.coords.longitude,
                        }

                      });


                    }

                });

		}).catch(() =>{
			console.log("Error to get location");
		});
		
		 that.platform.ready().then(() => {

				  var options = {
				  timeout: 5000
			  };
	  });
	  
	   setTimeout(function(){
		  //that.googleMap();
	  },2000)
	
	}

  ngOnInit() {
  
  }

  ionViewWillEnter(){
    this.storage.get('auth-token').then(token => {
      if(token){
        this.usersProvider.GetUserByToken(token).subscribe(data => {
          this.user = data.details;
          if(this.user){
            this.restaurantProvider.GetAllRestaurants().subscribe(data => {
              this.shops = [];
              data.details.data.forEach( snap =>{
                this.shops.push({
                  id: snap.merchant_id,
                  title: snap.restaurant_name,
                  backgroundImage: snap.logo,
                  address:snap.address,
                  cuisine:snap.cuisine,
                  menu_style:snap.menu_style,
                  bgimage:snap.bgimage,
                  ratings:snap.ratings
                });  
              });
            });
          }
          else
          {
            this.router.navigateByUrl('/list');
          }
        });
      }
      else{
         this.router.navigateByUrl('/list');
       }
    });
  }
}