import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController , MenuController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Values } from '../../providers/values';
import { Functions } from '../../providers/functions/functions';
import { AuthProvider } from '../../providers/auth/auth';
import { TokenProvider } from '../../providers/token/token';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public signupForm;
	loading: any;
	
	public currentUser: any;
	public userProfiles: any;

  constructor(
		private storage: Storage, 
		public loadingCtrl: LoadingController, 
		public alertCtrl: AlertController, 
		public formBuilder: FormBuilder,
		private router: Router,
		public functions: Functions,
		private authProvider: AuthProvider,
		private tokenProvider: TokenProvider,
		public values:Values,
		public menuCtrl: MenuController) { 
		
		
		this.signupForm = formBuilder.group({
			firstname: ['', Validators.compose([Validators.required])],
			lastname: ['', Validators.compose([Validators.required])],
			phone: ['', Validators.compose([Validators.required])],
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
			cpassword: ['', Validators.compose([Validators.minLength(6), Validators.required])],
			
		});
		
		
		}
		
		RegisterUser(){

			//this.ShowLoader();
			//this.disableRegister = true;
			  //this.buttonText = "Registering...";

			  this.authProvider.RegisterUser(this.signupForm.value.firstname,this.signupForm.value.lastname,
		this.signupForm.value.phone,this.signupForm.value.email,this.signupForm.value.password,this.signupForm.value.cpassword).subscribe(data =>{

				  this.tokenProvider.SetToken(data.token);
				  setTimeout(() => {
					  //this.loading.dismiss();

					//  this.disableRegister = false;
				//	this.buttonText = "Register Account";

					  this.router.navigateByUrl('/home');
					  this.menuCtrl.enable(true);

				  }, 2000);








        }, err => {

          //this.loading.dismiss();
          if(err.error.msg){
            alert(err.error.msg[0].message);

            //this.disableRegister = false;
            //this.buttonText = "Register Account";
          }

          if(err.error.message){
            alert(err.error.message);

            //this.disableRegister = false;
            //this.buttonText = "Register Account";
          }
        });

        //
  }

  ngOnInit() {
  }

}
