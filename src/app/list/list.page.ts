import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, MenuController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Values } from '../../providers/values';
import { TokenProvider } from '../../providers/token/token';
import { AuthProvider } from '../../providers/auth/auth';

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

  constructor(
		private storage: Storage, 
		public loadingCtrl: LoadingController, 
		public alertCtrl: AlertController, 
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
			if(data.code==1){
				console.log(data.token);
			  	this.tokenProvider.SetToken(data.token);
			  	setTimeout(() => {
				 	this.stopLoading();
				  	this.router.navigateByUrl('/home');
				  	this.menuCtrl.enable(true);
			  	}, 2000);
			}
			else
			{
				
				this.ShowErrorAlert(data.msg);

				alert(data.msg);
			}

        }, err => {
			console.log('error',err);
			this.stopLoading();
			if(err.error.msg){
				//this.ShowErrorAlert(err.error.msg[0].message);
				alert(err.error.msg[0].message);
			}
		  	if(err.error.message){
				alert(err.error.message);
		  	}
        });
			
		
	}
}
