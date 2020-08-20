import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, MenuController , ToastController} from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Values } from '../../providers/values';
import { TokenProvider } from '../../providers/token/token';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  public loginForm;
  public vcodeForm;
  public rresetForm;
	loading: any;
	userProfile: any = null;
	disableLogin: boolean = false;
	userProfiles: any = null;
	public currentUser: any;
	logonform: boolean = true;
	codeform: boolean = false;
	resetform: boolean = false;
	emailcode:any;
	client_id:any;

  constructor(
		private storage: Storage, 
		public loadingCtrl: LoadingController, 
		public alertCtrl: AlertController,
		public toastController: ToastController, 
		public formBuilder: FormBuilder, 
		private router: Router,
		public fb: Facebook,
		public values: Values,
		public tokenProvider: TokenProvider,
		public authProvider: AuthProvider,
		public menuCtrl: MenuController, ) {
			
			
			this.loginForm = formBuilder.group({
			email: ['', Validators.compose([Validators.required,Validators.email])]
		});

			this.vcodeForm = formBuilder.group({
			code: ['', Validators.compose([Validators.required])]
		});

			this.rresetForm = formBuilder.group({
			npass: ['', Validators.compose([Validators.required])],
			cpass: ['', Validators.compose([Validators.required])]
		});
			
		}

	ngOnInit() {
	}

	isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.loginForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasError1(controlName: string, validationType: string): boolean {
    const control = this.vcodeForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasError2(controlName: string, validationType: string): boolean {
    const control = this.rresetForm.controls[controlName];
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
		
		
	loginUser(): void {
		const controls = this.loginForm.controls;
		/** check form */
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		} 
			
		this.presentLoading();
			
		this.authProvider.ForgotUser(this.loginForm.value.email).subscribe(data =>{
			console.log('data',data);
			this.stopLoading();
			if(data.code==1){
			  	this.presentToast(data.msg,'success');
			  	this.logonform=false;
			  	this.codeform=true;
			  	this.emailcode=data.details.code;
			  	console.log('code',this.emailcode);
			  	this.client_id=data.details.client_id;
			}
			else
			{
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

	codecheck(): void {
		const controls = this.vcodeForm.controls;
		/** check form */
		if (this.vcodeForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
			if(this.emailcode==this.vcodeForm.value.code){
			  	this.presentToast('Verification code matched successfully','success');
			  	this.codeform=false;
			  	this.resetform=true;
			}
			else
			{
				this.presentToast('Verification code not matched','danger');
			}
	}

	resetcheck(): void {
		const controls = this.rresetForm.controls;
		/** check form */
		if (this.rresetForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		} 
			
		this.presentLoading();
			
		this.authProvider.ResetUser(this.rresetForm.value.npass,this.rresetForm.value.cpass,this.client_id).subscribe(data =>{
			this.stopLoading();
			if(data.code==1){
			  	this.presentToast(data.msg,'success');
			  	this.resetform=false;
			  	this.logonform=true;
			  	setTimeout(() => {
				  	this.router.navigateByUrl('/list');
			  	}, 2000);

			}
			else
			{
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
