import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ServiceProvider } from '../../providers/service';
import { Values } from '../../providers/values';
import { TokenProvider } from '../../providers/token/token';
import { UsersProvider } from '../../providers/users/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {

  user : any;
	products: any;

  constructor(public loadingCtrl: LoadingController, 
		private route: ActivatedRoute,
		public toastCtrl: ToastController, 
		private storage: Storage,
		public socialSharing: SocialSharing,
		public service: ServiceProvider,
		public values:Values,
		private usersProvider: UsersProvider,
		public tokenProvider: TokenProvider,
		private router: Router,) { 
		
		
		
		
		
		
		}

  ngOnInit() {
	  
	  
  }
  
  
  removeFavItem(id){
	  
	  
	  console.log("item id " + id);
	  
	  
	  
	  this.usersProvider.RemoveFromWishlist(id).subscribe(data => {
				console.log(data);

				//this.nav.setRoot(ListPage);
				//this.successUpload();
				
				this.router.navigateByUrl('/home');
			});
	  
	  //this.service.removeFavItem(item);
  }
  
  ionViewWillEnter(){
	  this.storage.get('auth-token').then(token => {
				if(token){
				  this.tokenProvider.GetPayload().then(value => {
					//this.user = value;
					
					this.products = [];

					this.usersProvider.GetUserById(value._id).subscribe(data => {
						this.user = data.result;
						this.products = data.result.favourite;
						
						console.log(this.user);
						console.log(this.products);
					});

					console.log(this.user);
				  });

				  
				  
				}
				else{
				   
				   
				 }
		 });
	  
  }

}
