import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ServiceProvider } from '../../providers/service';
import { Values } from '../../providers/values';
import { Router } from '@angular/router';

import { TokenProvider } from '../../providers/token/token';
import { AddressProvider } from '../../providers/address/address';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  currentUser: any;
	addressList: any = [];
	userProfiles: any;
	user: any;

  constructor(public loadingCtrl: LoadingController, 
		private route: ActivatedRoute,
		public toastCtrl: ToastController, 
		private storage: Storage,
		public socialSharing: SocialSharing,
		public service: ServiceProvider,
		public values:Values,
		public tokenProvider:TokenProvider,
		public addressProvider:AddressProvider,
		private router: Router,
		public alertCtrl: AlertController, ) { 
		
				
		
		
		}
		
	deleteUserAddress(id){
    
			this.addressProvider.DeleteAddress(id).subscribe(data => {
				console.log(data);

				//this.nav.setRoot(ListPage);
				this.successUpload();
				
				this.router.navigateByUrl('/home');
			});
	}

  ngOnInit() {
	  
  }
  
  async successUpload() {
		const alert = await this.alertCtrl.create({
			header: 'Delete',
			message: 'Address deleted successfully',
			buttons: [{
				text: "Ok",
				role: 'cancel'
			}]
		});
		await alert.present();
	}
	
	ionViewWillEnter(){
	
					this.addressList = [];
	  
					this.storage.get('auth-token').then(token => {
									if(token){
									  this.tokenProvider.GetPayload().then(value => {
										this.user = value;


										this.addressProvider.GetAddressByUser(this.user._id).subscribe(data => {
										  this.addressList = [];

											data.addressByUser.forEach( snap =>{
											  this.addressList.push({

												id: snap._id,
												city: snap.city,
												district: snap.district,
												street: snap.street,
												phone: snap.phone,
												address: snap.address,
												apartmentOffice: snap.apartmentOffice

											  });

											  console.log(this.addressList);
											});

										  console.log(this.addressList);
										});
									  });

									}

								  });
	  
  }

}
