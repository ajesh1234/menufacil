import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';

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

  constructor(public menuCtrl: MenuController, 
		public alertCtrl: AlertController, 
		private storage: Storage, 
		public loadingCtrl: LoadingController, 
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
    }, {
      validator: this.Validate.bind(this)
    });
  }
  
  
  Validate(passwordFormGroup: FormGroup) {
    const new_password = passwordFormGroup.controls.newPassword.value;
    const confirm_password = passwordFormGroup.controls.confirmPassword.value;

	//console.log(new_password);
	//console.log(confirm_password);
	
    if (confirm_password.length <= 0) {
      return null;
    }

    if (confirm_password !== new_password) {
      return {
        doesNotMatch: true
      };
    }

    return null;
  }
  
  OnPasswordChange(){
      this.usersProvider.ChangePassword(this.passwordForm.value).subscribe(data => {
          console.log(data);
		
		  
		  this.successfullyPasswordChanged();
		  
		  this.router.navigateByUrl('/home');
		  
		  
      }, err => {

        console.log(err);
        if(err.error.msg){
		
		   
		   this.errorPasswordChanged(err.error.msg[0].message);
		   
		   this.router.navigateByUrl('/home');
		
        }
        if(err.error.message){
	
		   this.error2PasswordChanged(err.error.message);
		     
		   this.router.navigateByUrl('/home');
        }

      });
  }
  
  GetPostTime(time){
    return moment(time).fromNow();
  }
  
  async successfullyPasswordChanged() {
		const alert = await this.alertCtrl.create({
			message: 'Password changed successfully',
			buttons: [{
				text: "Ok",
				role: 'cancel'
			}]
		});
		await alert.present();
	}
	
	async errorPasswordChanged(error) {
		    const alert = await this.alertCtrl.create({
			message: error,
			buttons: [{
				text: "Ok",
				role: 'cancel'
			}]
			});
			await alert.present();
	}
	
	async error2PasswordChanged(error) {
		    const alert = await this.alertCtrl.create({
			message: error,
			buttons: [{
				text: "Ok",
				role: 'cancel'
			}]
			});
			await alert.present();
	}
	
	ionViewWillEnter(){
	   this.storage.get('auth-token').then(token => {
			  if(token){
				this.tokenProvider.GetPayload().then(value => {
					
					this.usersProvider.GetUserById(value._id).subscribe(data => {
						this.user = data.result;

						console.log(this.user);
					});
					
				  //this.user = value;

				  console.log(this.user);
				});

			   // this.nav.setRoot(ListPage);
			  }
			  else{
				 alert("Go To Home");
			   }
		  });
	  
  }

}
