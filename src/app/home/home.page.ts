import { Component , OnInit} from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { Values } from '../../providers/values';

import { CallNumber } from '@ionic-native/call-number/ngx';
import { AuthProvider } from '../../providers/auth/auth';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';
import { TokenProvider } from '../../providers/token/token';
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
      	public tokenProvider: TokenProvider) {}
	  
	  
  	ngOnInit(){
  		// Optionally request the permission early
		this.qrScanner.prepare()
		  .then((status: QRScannerStatus) => {
		     if (status.authorized) {
		       // camera permission was granted


		       // start scanning
		       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
		         console.log('Scanned something', text);

		         this.qrScanner.hide(); // hide camera preview
		         scanSub.unsubscribe(); // stop scanning
		       });

		     } else if (status.denied) {
		       // camera permission was permanently denied
		       // you must use QRScanner.openSettings() method to guide the user to the settings page
		       // then they can grant the permission from there
		     } else {
		       // permission was denied, but not permanently. You can ask for permission again at a later time.
		     }
		  })
		  .catch((e: any) => console.log('Error is', e));
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
                      cuisine:snap.cuisine,
                      menu_style:snap.menu_style,
                      bgimage:snap.bgimage

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
