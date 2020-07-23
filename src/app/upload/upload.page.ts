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
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  image: any;
	 post: any;
	 socket: any;
	 user: any;
	 
 
	
  constructor(
	private camera: Camera,
	private usersProvider: UsersProvider,
	private storage: Storage,
	private tokenProvider: TokenProvider,
	public alertCtrl: AlertController, 
	private router: Router,
  ) { 
		
  
		
	
  }

  ngOnInit() {
  }
  
  addPost(){
	  console.log(this.image);
	  if(!this.image){
		  return;
	  }
	  let body;
	  
	  //this.post = "Here is post";
	  
	  if(this.image){
		  body = {
		//	  post: this.post,
			  image: this.image,
		  }
		  
	  }
	  
	  this.usersProvider.UpdateProfileImage(body).subscribe(data => {
			console.log(data);
			this.image = '';
			this.success();
			
			this.router.navigateByUrl('/home');
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
			console.log(img);
			this.image = 'data:image/jpeg;base64,' + img;
			
			this.successUpload();
	  });
	  
	  
  }
  
  async success() {
		const alert = await this.alertCtrl.create({
			header: 'Success',
			message: 'Successfully upload your profile',
			buttons: [{
				text: "Ok",
				role: 'cancel'
			}]
		});
		await alert.present();
	}
	
	async successUpload() {
		const alert = await this.alertCtrl.create({
			header: 'Image Upload',
			message: 'Successfully selected image',
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
