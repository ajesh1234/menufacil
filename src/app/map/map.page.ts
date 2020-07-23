import { Component, OnInit } from '@angular/core';
import { Platform , LoadingController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Values } from '../../providers/values';
import { ServiceProvider } from '../../providers/service';

import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { Stripe } from '@ionic-native/stripe/ngx';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { OrderProvider } from '../../providers/order/order';
import { TokenProvider } from '../../providers/token/token';
import { UsersProvider } from '../../providers/users/users';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';

declare var google;
declare var map;
declare var infoWindow;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  userList: any;
	user: any;
  lat: any;
  lng: any;
  restaurantLat: any;
  restaurantLng: any;

  constructor(public geo:Geolocation,public platform: Platform, 
  public service : ServiceProvider,public tokenProvider: TokenProvider,
    public orderProvider: OrderProvider,
    public storage : Storage,
    public userProvider: UsersProvider,
    public restaurantProvider: RestaurantProvider) { 
	
	  let that = this;
	  let map : any;
	  let infoWindow : any;
	  let beachMarker: any;
	  let image: any;
	  
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

                        console.log(this.user);



                        body = {

                          lat: resp.coords.latitude,
                          lng: resp.coords.longitude,
                        }

                          this.userProvider.UpdateLocation(body).subscribe(data =>{
                              console.log(data);
                          });

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
		  that.googleMap();
	  },2000)
	
	}

  ngOnInit() {
  
  }
  
  googleMap(){
	  let map : any;
	  let infoWindow : any;
	  let beachMarker: any;
	  let image: any;

	 // let markers : any;


                this.storage.get('auth-token').then(token => {
                    if(token){
                      this.tokenProvider.GetPayload().then(value => {
                        this.user = value;

                        console.log(this.user);


                          this.userProvider.GetUserById(this.user._id).subscribe(data =>{
                              console.log(data);

                              this.userList = data.result;

                              this.lat = parseFloat(data.result.lat);
                              this.lng = parseFloat(data.result.lng);

                              /***start ***/

                              map = new google.maps.Map(document.getElementById('map'), {
                                center: {lat: this.lat, lng: this.lng},
                                zoom: 6
                              });


                              image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
                                beachMarker = new google.maps.Marker({
                                position: {lat: this.lat, lng: this.lng},
                                map: map,
                                icon: image
                              });

                          var posUser = {
                                    lat: this.lat,
                                    lng: this.lng
                                  };


                            infoWindow = new google.maps.InfoWindow;

                                infoWindow.setPosition(posUser);
                                infoWindow.setContent('Thats2 your Location.');
                                infoWindow.open(map);
                                map.setCenter(posUser);


                                   // Additional Markers //
                               var markers = [];
                           var distance = [];
                              // infoWindow = new google.maps.InfoWindow();
                              var createMarker = function (info){

                                console.log(info);
                                this.restaurantLat = parseFloat(info.restaurantLat);
                                this.restaurantLng = parseFloat(info.restaurantLng);

                                  var marker = new google.maps.Marker({
                                      position: new google.maps.LatLng(this.restaurantLat, this.restaurantLng),
                                      map: map,
                                      animation: google.maps.Animation.DROP,
                                      title: info.restaurantName
                                  });
                                  marker.content = '<div class="infoWindowContent">' + info.restaurantAddress + '</div>';
                                  google.maps.event.addListener(marker, 'click', function(){
                                      infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                                      infoWindow.open(map, marker);
                                  });
                                  markers.push(marker);
                              }


                              this.restaurantProvider.GetAllRestaurants().subscribe(data =>{
                                console.log(data);

                                /** all restaurant begin**/

                                data.restaurants.forEach(childSnapshot => {
                                  // key will be "fred" the first time and "barney" the second time
                                    //console.log(childSnapshot.val());
                                  //console.log(childSnapshot.key);
                                  var key = childSnapshot._id;


                                        //createMarker(childSnapshot);

                                        console.log(childSnapshot);
                                this.restaurantLat = parseFloat(childSnapshot.restaurantLat);
                                this.restaurantLng = parseFloat(childSnapshot.restaurantLng);

                                  var marker = new google.maps.Marker({
                                      position: new google.maps.LatLng(this.restaurantLat, this.restaurantLng),
                                      map: map,
                                      animation: google.maps.Animation.DROP,
                                      title: childSnapshot.restaurantName
                                  });
                                  marker.content = '<div class="infoWindowContent">' + childSnapshot.restaurantAddress + '</div>';
                                  google.maps.event.addListener(marker, 'click', function(){
                                      infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                                      infoWindow.open(map, marker);
                                  });
                                  markers.push(marker);


                                        console.log(childSnapshot.restaurantLat);
                                        console.log(childSnapshot.restaurantLng);
                                        //console.log(childSnapshot.val().title);

                                    //   distance.push(calcDistance(childSnapshot.restaurantLat,childSnapshot.restaurantLng,childSnapshot._id) + " kilometers away");


                                });



                                /** all restaurant end**/



                                /*** calsc distance begin**/






                                /****** calc distance end**/
                          });


                              /***end ***/
                          });

                      });


                    }

                });












  }

}
