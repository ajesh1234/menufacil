import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, AlertController, Platform, ToastController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { TokenProvider } from '../../providers/token/token';
import { AddressProvider } from '../../providers/address/address';
import { UsersProvider } from '../../providers/users/users';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  	addressForm : FormGroup;
	passwordForm : FormGroup;
	user: any;
	loading: any;
	my_photo: any = null;
	token: any;

  	constructor(public menuCtrl: MenuController, 
		public alertCtrl: AlertController, 
		private storage: Storage, 
		public loadingCtrl: LoadingController,  
		public toastController: ToastController,
		private formBuilder: FormBuilder,
		private router: Router,
		public camera: Camera,
		public platform: Platform,
		public tokenProvider : TokenProvider,
		public addressProvider : AddressProvider,
		public usersProvider : UsersProvider) { 
		
		this.Init();
		
	}

  	ngOnInit() {
  	}
  
  	Init(){
    	this.passwordForm = this.formBuilder.group({
		        cpassword: ['', Validators.required],
		        newPassword: ['', Validators.required],
		        confirmPassword: ['', Validators.required],
    		});
  	}

  	ionViewWillEnter(){
	   	this.storage.get('auth-token').then(token => {
		  	if(token){
				this.tokenProvider.GetPayload().then(value => {
					
					this.usersProvider.GetUserByToken(token).subscribe(data => {
						this.token = token;
						this.user = data.details;

						console.log(this.user);
					});
					
				  	//this.user = value;

				  	console.log(this.user);
				});

			   	// this.nav.setRoot(ListPage);
		  	}
		  	else{
		 		 this.router.navigateByUrl('/home');
		   	}
	  	});
  	}

  	isControlHasError(controlName: string, validationType: string): boolean {
    	const control = this.passwordForm.controls[controlName];
	    if (!control) {
	      return false;
	    }

    	const result = control.hasError(validationType) && (control.dirty || control.touched);
    	return result;
  	}

  	async presentLoading() {
    	this.loading = await this.loadingCtrl.create();
    	await this.loading.present();
  	}

  	async stopLoading() {
    	if(this.loading != undefined){
      		await this.loading.dismiss();
    	}
	    else{
	      var self = this;
	      setTimeout(function(){
	        self.stopLoading();
	      },1000);
	    }
  	}

  	async presentToast(message,color) {
    	const toast = await this.toastController.create({
			message: message,
			duration: 3000,
			position: 'bottom',
			color: color,
			showCloseButton: true
    	});
    	toast.present();
  	}
  
  	OnPasswordChange(){
  		const controls = this.passwordForm.controls;
		/** check form */
		if (this.passwordForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		} 
			
		this.presentLoading();
		let body;
		body = {
		  		npassword: this.passwordForm.value.newPassword,
		  		cpassword: this.passwordForm.value.confirmPassword,
		  		opassword: this.passwordForm.value.cpassword,
		  		client_token: this.token
		  	}

      	this.usersProvider.ChangePassword(body).subscribe(data => {
      		this.stopLoading();
      		if(data.code==1){
				this.presentToast(data.msg,'success');
				this.router.navigateByUrl('/home');
			  	
			}else{
				this.presentToast(data.msg,'danger');
			}
      	}, err => {

        	this.stopLoading();
			if(err.error.msg){
				this.presentToast(err.error.msg[0].message,'danger');
			}
		  	if(err.error.message){
		  		this.presentToast(err.error.message,'danger');
		  	}
      	});
  	}
}