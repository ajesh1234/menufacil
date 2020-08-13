import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController , MenuController, ToastController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Values } from '../../providers/values';
import { Functions } from '../../providers/functions/functions';
import { AuthProvider } from '../../providers/auth/auth';
import { TokenProvider } from '../../providers/token/token';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public signupForm;
	loading: any;
	
	public currentUser: any;
	public userProfiles: any;

  constructor(
		private storage: Storage, 
		public loadingCtrl: LoadingController, 
		public alertCtrl: AlertController, 
		public toastController: ToastController,
		public formBuilder: FormBuilder,
		private router: Router,
		private authProvider: AuthProvider,
		private tokenProvider: TokenProvider,
		public menuCtrl: MenuController) { 
		
		
			this.signupForm = formBuilder.group({
			firstname: ['', Validators.compose([Validators.required,Validators.pattern('[a-zA-Z]*')])],
			lastname: ['', Validators.compose([Validators.required,Validators.pattern('[a-zA-Z]*')])],
			phone: ['', Validators.compose([Validators.required,Validators.maxLength(10),Validators.pattern('[0-9]*')])],
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
			cpassword: ['', Validators.compose([Validators.minLength(6), Validators.required])],
			
		});
		
		}

	ngOnInit() {
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

	  	this.authProvider.RegisterUser(this.signupForm.value.firstname,this.signupForm.value.lastname,
		this.signupForm.value.phone,this.signupForm.value.email,this.signupForm.value.password,this.signupForm.value.cpassword).subscribe(data =>{
			this.stopLoading();
			if(data.code==1){
				console.log(data.token);
				
			  	this.tokenProvider.SetToken(data.token);
			  	setTimeout(() => {

			  		this.router.navigateByUrl('/home');
				  	this.menuCtrl.enable(true);

			  	}, 2000);
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