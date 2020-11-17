import { Component, OnInit } from '@angular/core';
import { Platform , LoadingController, NavController, ToastController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Values } from '../../providers/values';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { OrderProvider } from '../../providers/order/order';
import { AuthProvider } from '../../providers/auth/auth';
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
    public values: Values,
    public router: Router,
    public geo:Geolocation,
    public platform: Platform, 
    public tokenProvider: TokenProvider,
    public orderProvider: OrderProvider,
    public toastCtrl: ToastController, 
    private storage: Storage, 
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public authProvider: AuthProvider,
    public usersProvider: UsersProvider,
    public restaurantProvider: RestaurantProvider) {}

  ngOnInit() {
  
  }

  ionViewWillEnter(){
    this.storage.get('auth-token').then(token => {
      if(token){
        this.usersProvider.GetUserByToken(token).subscribe(data => {
          this.user = data.details;
          if(this.user){
            let that = this;
            let options = {
              frequency: 3000,
              enableHighAccuracy: true
            };
            
            this.geo.getCurrentPosition(options).then(resp =>{
              let body;
              body = {
                lat: resp.coords.latitude,
                lng: resp.coords.longitude,
              }

              this.restaurantProvider.GetNearRestaurants(body).subscribe(data => {
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
                    ratings:snap.ratings,
                    description:snap.description
                  });  
                });
            });
                  

            }).catch(() =>{
              console.log("Error to get location");
            });
            
            that.platform.ready().then(() => {
                var options = {
                  timeout: 5000
                };
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