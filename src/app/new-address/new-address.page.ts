import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Values } from '../../providers/values';
import { ServiceProvider } from '../../providers/service';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { Stripe } from '@ionic-native/stripe/ngx';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { TokenProvider } from '../../providers/token/token';
import { AddressProvider } from '../../providers/address/address';
import { CityProvider } from '../../providers/city/city';
import { DistrictProvider } from '../../providers/district/district';
import { StreetProvider } from '../../providers/street/street';
import { ApartmentProvider } from '../../providers/apartment/apartment';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.page.html',
  styleUrls: ['./new-address.page.scss'],
})
export class NewAddressPage implements OnInit {

  form: any;
	   currentUser: any;
	   errorMessage: any;
	   customer: any;
	   restaurantName: any;
	   cityName: any;
	   cityDistrictName: any;
	   streetName: any;
	   apartmentOfficeName: any;
	   user: any;
  
	   public signupForm;
	   loading: any;

  constructor(
				public service: ServiceProvider, 
				public values:Values, private payPal: PayPal, 
				private stripe: Stripe,
				private router: Router,
				private route: ActivatedRoute,
				public loadingCtrl: LoadingController,
				public alertCtrl: AlertController, 
				public formBuilder: FormBuilder,
				public tokenProvider : TokenProvider,
				public addressProvider: AddressProvider,
				public storage : Storage,
				public cityProvider : CityProvider,
				public districtProvider : DistrictProvider,
				public streetProvider : StreetProvider,
				public apartmentProvider : ApartmentProvider) { 
				
				this.storage.get('auth-token').then(token => {
				  if(token){
					this.tokenProvider.GetPayload().then(value => {
					  this.user = value;
					});

				  }

				});
				
				this.cityProvider.GetAllCities().subscribe(data => {
		
				console.log(data);
				
				
					this.cityName = [];

					  data.cities.forEach( snap => {
						this.cityName.push({
						id: snap._id,
						name: snap.cityName
						});
					  });
			 
			

				});
				
			this.districtProvider.GetAllDistricts().subscribe(data => {
		
				console.log(data);
				
				
					this.cityDistrictName = [];

					  data.districts.forEach( snap => {
						this.cityDistrictName.push({
						id: snap._id,
						name: snap.districtName
						});
					  });
			 
			

				});	
				
				
			this.streetProvider.GetAllStreets().subscribe(data => {
		
				console.log(data);
				
				
					this.streetName = [];

					  data.streets.forEach( snap => {
						this.streetName.push({
						id: snap._id,
						name: snap.streetName
						});
					  });
			 
			

				});	


			this.apartmentProvider.GetAllApartments().subscribe(data => {
		
				console.log(data);
				
				
					this.apartmentOfficeName = [];

					  data.apartments.forEach( snap => {
						this.apartmentOfficeName.push({
						id: snap._id,
						name: snap.apartmentName
						});
					  });
			 
			

				});	
				
				
				this.signupForm = formBuilder.group({
					city: ['', Validators.compose([Validators.required,])],
					district: ['', Validators.compose([Validators.minLength(6), Validators.required])],
					street: ['', Validators.compose([Validators.minLength(6), Validators.required])],
					apartmentOffice: ['', Validators.compose([Validators.minLength(5), Validators.required])],
					phone: ['', Validators.compose([ Validators.required])],
					address: ['', Validators.compose([Validators.required])],
				});
				
				
	}

  ngOnInit() {
  }
  
  addNewAddress(){

    let body;

    this.storage.get('auth-token').then(token => {
      if(token){
        this.tokenProvider.GetPayload().then(value => {
          this.user = value;



          body = {

            //city: this.customer.city,
            //district: this.customer.district,
            //street: this.customer.street,
            //apartmentOffice: this.customer.apartmentOffice,
            //phone: this.customer.phone,
            //address: this.customer.address,
            //user: this.user._id,
			
			city: this.signupForm.value.city,
			district: this.signupForm.value.district,
			street: this.signupForm.value.street,
			apartmentOffice: this.signupForm.value.apartmentOffice,
			phone: this.signupForm.value.phone,
			address: this.signupForm.value.address,
			user: this.user._id,

          }


          this.addressProvider.addAddress(body).subscribe(data => {
                console.log(data);

                //this.nav.push(CartPage);
				this.success();
				
				this.router.navigateByUrl('/home');
				
          });


        });

      }

    });



  }
  
  async success() {
		const alert = await this.alertCtrl.create({
			header: 'Success',
			message: 'Successfully created new address',
			buttons: [{
				text: "Ok",
				role: 'cancel'
			}]
		});
		await alert.present();
	}

}
