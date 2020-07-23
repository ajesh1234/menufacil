import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ItemProvider } from '../../providers/item/item';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  productsList: any;
	id: any;
	restaurantName: any;
	owner_id: any;
	restaurantId: any;
	

  constructor(public loadingCtrl: LoadingController, 
		private route: ActivatedRoute,
		public toastCtrl: ToastController, 
		private storage: Storage,
		public socialSharing: SocialSharing,
		public itemProvider: ItemProvider
		) { 
		
			this.route.params.subscribe(params => {
			
			console.log(params);
			
			this.id = params.id;
			this.restaurantName = params.restaurantName;
			this.owner_id = params.owner_id;
			this.restaurantId = params.restaurantId;
			
			
			this.itemProvider.GetItemByCategory(this.id).subscribe(data => {
					this.productsList = [];
					

					data.itemsByCategory.forEach( snap =>{
						  this.productsList.push({

						    id: snap._id,
							price: snap.itemPrice,
							favorite: false,
							title: snap.itemName,
							image: "https://res.cloudinary.com/funnyionic/image/upload/v" + snap.itemImgVersion + "/" + snap.itemImgId,

						  });
						});
									
					console.log(this.productsList);
				});
			
			
				
				
				
			});
		
		
		}

  ngOnInit() {
  }

}
