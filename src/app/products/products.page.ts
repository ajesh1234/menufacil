import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ItemProvider } from '../../providers/item/item';
import { CategoryProvider } from '../../providers/category/category';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  	productsList: any;
  	categoryList: any;
	id: any;
	restaurantName: any;
	owner_id: any;
	restaurantId: any;
	

  	constructor(public loadingCtrl: LoadingController, 
		private route: ActivatedRoute,
		public toastCtrl: ToastController, 
		private storage: Storage,
		public socialSharing: SocialSharing,
		public itemProvider: ItemProvider,
		public categoryProvider: CategoryProvider
		) 
  	{ 
		
		this.route.params.subscribe(params => {
		
			this.id = params.id;
			this.categoryProvider.GetCategoryByRestaurant(this.id).subscribe(data => {
			  	this.categoryList = [];

				data.details.menu_category.forEach( snap =>{
				  	this.categoryList.push({
						id: snap.cat_id,
						category: snap.category_name,
						title: snap.category_name
					});
				});
			});
			
		});
		
		
	}

  	ngOnInit() {
  	}

  	getitems(catid){
  		this.itemProvider.GetItemByCategory(this.id).subscribe(data => {
			this.productsList = [];
			data.details.itemsByCategory.forEach( snap =>{
				  this.productsList.push({
				    id: snap._id,
					price: snap.itemPrice,
					favorite: false,
					title: snap.itemName,
					image: "https://res.cloudinary.com/funnyionic/image/upload/v" + snap.itemImgVersion + "/" + snap.itemImgId,

				  });
			});
		});
  	}
}
