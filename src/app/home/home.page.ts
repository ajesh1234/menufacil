import { Component , OnInit} from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { Values } from '../../providers/values';

import { CallNumber } from '@ionic-native/call-number/ngx';
import { AuthProvider } from '../../providers/auth/auth';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';
import { TokenProvider } from '../../providers/token/token';
import { UsersProvider } from '../../providers/users/users';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  	public user: any;
	public shops: any;
	public merchant_id: any;

  	constructor(
  		private qrScanner: QRScanner,
		public toastCtrl: ToastController, 
		private storage: Storage, 
		public navCtrl: NavController,
		public loadingCtrl: LoadingController,
		private callNumber: CallNumber,
		public values: Values,
		public router: Router,
		public authProvider: AuthProvider,
      	public restaurantProvider: RestaurantProvider,
  private usersProvider: UsersProvider,
      	public tokenProvider: TokenProvider) {}
	  
	  
  	ngOnInit(){
  		
  	}
  	
  	ionViewWillEnter(){

  		this.storage.get('auth-token').then(token => {
	      if(token){
	        this.usersProvider.GetUserByToken(token).subscribe(data => {
	          this.user = data.details;
	          if(this.user){

	          	// Optionally request the permission early
				this.qrScanner.prepare()
				  .then((status: QRScannerStatus) => {
					  console.log('enter scan');
				     if (status.authorized) {
				       // camera permission was granted
					   alert('granted');

				       // start scanning
				       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
				         console.log('Scanned something', text);
				         var newtext = text.split("-");
				         console.log('split newtext', newtext);
				         this.qrScanner.hide(); // hide camera preview
				         scanSub.unsubscribe(); // stop scanning

				        this.merchant_id=newtext[1];
				        localStorage.setItem('tblid',newtext[0]);

						this.restaurantProvider.getRestaurantbyid(this.merchant_id).subscribe(data => {
					 
							this.shops = data.details.data[0];
							console.log(this.shops);
							this.router.navigate(['/products'], {queryParams : {id: this.shops.merchant_id, name: this.shops.restaurant_name, address: this.shops.address, cuisine: this.shops.cuisine, logo: this.shops.logo, menu_style: this.shops.menu_style, bgimage: this.shops.bgimage, rating: this.shops.ratings.ratings, votes: this.shops.ratings.votes}});
							//this.router.navigateByUrl('/products;id='+this.shops.merchant_id+';name='+this.shops.restaurant_name+';address='+this.shops.address+';cuisine='+this.shops.cuisine+';logo='+this.shops.logo+';menu_style='+this.shops.menu_style+';bgimage='+this.shops.bgimage+';rating='+this.shops.ratings.ratings+';votes='+this.shops.ratings.votes);
						});
						 
				       	});

				       this.qrScanner.resumePreview();

			          // show camera preview
			          this.qrScanner.show();


				     } else if (status.denied) {
				     	alert('denied');
				       // camera permission was permanently denied
				       // you must use QRScanner.openSettings() method to guide the user to the settings page
				       // then they can grant the permission from there
				     } else {
				       // permission was denied, but not permanently. You can ask for permission again at a later time.
				       alert('else');
				     }
				  })
				  .catch((e: any) => console.log('Error is', e));

	            /*this.restaurantProvider.GetAllRestaurants().subscribe(data => {
			 
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
				});*/
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
	  
   	call(data){
		this.callNumber.callNumber(data.phonenumber, true).then(() =>{

		}).catch(() =>{

		});
	}
}
