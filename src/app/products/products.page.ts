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
	address: any;
	cuisine: any;
	logo: any;
	owner_id: any;
	restaurantId: any;
	lng:any;
	cat_id:any;
	selectedItem:any;
	

  	constructor(public loadingCtrl: LoadingController, 
		private route: ActivatedRoute,
		public toastCtrl: ToastController, 
		private storage: Storage,
		public socialSharing: SocialSharing,
		public itemProvider: ItemProvider,
		public categoryProvider: CategoryProvider
		) 
  	{ 

		this.lng='en';
		
		this.route.params.subscribe(params => {
		console.log('params',params);
			this.id = params.id;
			this.restaurantName = params.name;
			this.address = params.address;
			this.cuisine = params.cuisine;
			this.logo = params.logo;
			this.categoryProvider.GetCategoryByRestaurant(this.id).subscribe(data => {
			  	this.categoryList = [];

				data.details.menu_category.forEach( snap =>{
				  	this.categoryList.push({
						id: snap.cat_id,
						category: snap.category_name
					});
				});
				this.selectedItem = this.categoryList[0];
				this.getitems(this.categoryList[0].id);
			});
			
		});
		
		
	}

  	ngOnInit() {
  	}

  	language(){
  		console.log(this.lng);
  		this.getitems(this.cat_id);
  	}

  	listClick(event, newValue) {
    	this.selectedItem = newValue;  // don't forget to update the model here
    }

  	getitems(catid){
  		this.cat_id=catid;
  		this.itemProvider.GetItemByCategory(this.id,this.cat_id,this.lng).subscribe(data => {
			this.productsList = [];
			if(data.code==1){
				data.details.item.forEach( snap =>{
					if(this.lng=='sp'){
					snap.item_name=snap.item_name_sp;
					snap.item_description=snap.item_description_sp;
				}else if(this.lng=='ct'){
					snap.item_name=snap.item_name_ct;
					snap.item_description=snap.item_description_ct;
				}
				  this.productsList.push({
				    id: snap.item_id,
					title: snap.item_name,
					item_description:snap.item_description,
					calories:snap.calories,
					price: snap.prices,
					medium_price: snap.medium_price,
					large_price: snap.large_price,
					image: snap.photo,
				  });
				});
			}else{

			}
		});
  	}
}
