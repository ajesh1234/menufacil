import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, AlertController, Platform, ToastController, Events } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';

import { TokenProvider } from '../../providers/token/token';
import { AddressProvider } from '../../providers/address/address';
import { UsersProvider } from '../../providers/users/users';
import * as moment from 'moment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  	image: any;
 	post: any;
 	socket: any;
 	user: any;
 	token:any;

 	public signupForm;
	loading: any;
	
	public currentUser: any;
	public userProfiles: any;
	
  	constructor(
	public events: Events,
		private camera: Camera,
		public loadingCtrl: LoadingController, 
		private usersProvider: UsersProvider,
		private storage: Storage,
		public toastController: ToastController,
		private tokenProvider: TokenProvider,
		public alertCtrl: AlertController, 
		public formBuilder: FormBuilder,
		private router: Router,
  	) 
  	{
  		this.Init();

  		this.signupForm = formBuilder.group({
			firstname: ['', Validators.compose([Validators.required,Validators.pattern('[a-zA-Z]*')])],
			lastname: ['', Validators.compose([Validators.required,Validators.pattern('[a-zA-Z]*')])],
			phone: ['', Validators.compose([Validators.required,Validators.maxLength(10),Validators.pattern('[0-9]*')])],
			email: ['', '']
			
		});
  	}

  	ngOnInit() {
  	}

  	Init(){
  		this.storage.get('auth-token').then(token => {
		    if(token){
		      this.tokenProvider.GetPayload().then(value => {
		        this.usersProvider.GetUserByToken(token).subscribe(data => {
		        	this.token = token;
		            this.user = data.details;
		            this.signupForm.patchValue({
		            	firstname: this.user.first_name,
		            	lastname: this.user.last_name,
		            	phone: this.user.contact_phone,
		            	email: this.user.email_address
		            })
		        });
		      });
		    }
    	});
  	}

  	isControlHasError(controlName: string, validationType: string): boolean {
    	const control = this.signupForm.controls[controlName];
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

  	RegisterUser(){
		const controls = this.signupForm.controls;
		/** check form */
		if (this.signupForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		} 
			
		this.presentLoading();
		let body;
		body = {
		  		first_name: this.signupForm.value.firstname,
		  		last_name: this.signupForm.value.lastname,
		  		contact_phone: this.signupForm.value.phone,
		  		client_token: this.token
		  	}

	  	this.usersProvider.UpdateProfile(body).subscribe(data =>{
			this.stopLoading();
			if(data.code==1){
				this.user.first_name=body.first_name;
				this.user.last_name=body.last_name;
			  	this.events.publish('user_profile_updated:true',this.user);
			  	this.presentToast(data.msg,'success');
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
  
  	addPost(){
	  	if(!this.image){
		  	return;
	  	}
	  	let body;
	  	if(this.image){
		  	body = {
			  	image: this.image,
			  	client_token: this.token
		  	}
	  	}
	  
	  	this.usersProvider.UpdateProfileImage(body).subscribe(data => {
			this.image = '';
			if(data.code==1){
				this.user.avatar=data.details;
				this.events.publish('user_profile_updated:true',this.user);
			  	this.presentToast(data.msg,'success');
			}else{
				this.presentToast('Something went wrong try again','danger');
			}
			//this.router.navigateByUrl('/home');
	  	});
  	}
  
  	selectImage(){
	  	const options: CameraOptions = {
			quality: 50,
			destinationType: this.camera.DestinationType.DATA_URL,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
			allowEdit: false,
			correctOrientation: true,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			targetWidth: 300,
			targetHeight: 300
	  	}
	  
	  	this.camera.getPicture(options).then(img => {
			this.image = 'data:image/jpeg;base64,' + img;
			this.addPost();
	  	}, (err) => {
		 // Handle error
		 console.log('imgerr',err);
		});  
  	}
}