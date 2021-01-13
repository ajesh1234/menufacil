import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, MenuController , ToastController, Events} from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Values } from '../../providers/values';
import { TokenProvider } from '../../providers/token/token';
import { AuthProvider } from '../../providers/auth/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  public loginForm;
	loading: any;
	userProfile: any = null;
	disableLogin: boolean = false;
	userProfiles: any = null;
	public currentUser: any;
	userData: any = {};

  constructor(
  	private googlePlus: GooglePlus,
	public events: Events,
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
			email: ['', Validators.compose([Validators.required,Validators.email])],
			password: ['', Validators.compose([Validators.required])]
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
			
		this.authProvider.LoginUser(this.loginForm.value.email, this.loginForm.value.password).subscribe(data =>{
			console.log('data',data);
			this.stopLoading();
			if(data.code==1){
				console.log('ddd',data.details);
			  	this.tokenProvider.SetToken(data.details.token);
			  	setTimeout(() => {
				  	this.router.navigateByUrl('/home');
				  	this.events.publish('user_profile_updated:true',data.details);
				  	this.menuCtrl.enable(true);
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

	googleSignIn(){
		this.googlePlus.login({})
      .then(result => {
      	this.userData = result;
      	console.log(this.userData);
      })
      .catch(err => {
      	this.userData = `Error ${JSON.stringify(err)}`;
      	console.log(this.userData);	
      });

	}
}
