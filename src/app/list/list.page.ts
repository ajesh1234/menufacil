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
			email: ['', Validators.compose([Validators.required])],
			password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
		});
			
		}
		
		
	loginUser(): void {
		if (!this.loginForm.valid) {
			console.log(this.loginForm.value);
		} else {
			
			//this.presentLoading();
			
			this.authProvider.LoginUser(this.loginForm.value.email,
					this.loginForm.value.password).subscribe(data =>{

					console.log(data.token);
					
					  this.tokenProvider.SetToken(data.token);
							  setTimeout(() => {
								 // this.loading.dismiss();


								  this.router.navigateByUrl('/home');
								  this.menuCtrl.enable(true);

					  }, 2000);



        }, err => {

					  console.log(err);
					  //this.loading.dismiss();
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
	
	ngOnInit() {
	}

}
