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
	bgimage: any;
	menu_style: any;
	owner_id: any;
	restaurantId: any;
	lng:any;
	cat_id:any;
	selectedItem:any;
	firstname:any;
	

  	constructor(public loadingCtrl: LoadingController, 
		private route: ActivatedRoute,
		public toastCtrl: ToastController, 
		private storage: Storage,
		public socialSharing: SocialSharing,
		public itemProvider: ItemProvider,
		public categoryProvider: CategoryProvider
		) 
  	{ 

		this.lng='sp';
		this.cat_id='All';
		this.firstname='';
		
		this.route.params.subscribe(params => {
		console.log('params',params);
			this.id = params.id;
			this.restaurantName = params.name;
			this.address = params.address;
			this.cuisine = params.cuisine;
			this.logo = params.logo;
			this.menu_style = params.menu_style;
			this.bgimage = params.bgimage;
			this.category();
		});
		
		
	}

  	ngOnInit() {
  	}

  	category(){
  		this.categoryProvider.GetCategoryByRestaurant(this.id,this.lng,this.firstname).subscribe(data => {
		  	this.categoryList = [];
			if(data.details.menu_category!=false){

			data.details.menu_category.forEach( snap =>{
			  	this.categoryList.push({
					id: snap.cat_id,
					category: snap.category_name
				});
			});
		}
			this.selectedItem = this.cat_id;
			this.getitems(this.cat_id);
		});
  	}

  	language(){
  		this.cat_id='All';
  		this.category();
  	}

  	listClick(event, newValue) {
    	this.selectedItem = newValue;  // don't forget to update the model here
    }

  	getitems(catid){
  		this.cat_id=catid;
  		this.itemProvider.GetItemByCategory(this.id,this.cat_id,this.lng,this.firstname).subscribe(data => {
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
				if(snap.medium_price>0 && snap.large_price>0){
					var sizes=3;
				}else if(snap.medium_price>0 || snap.large_price>0){
					var sizes=2;
				}else{
					var sizes=1;
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
					size:sizes
				  });
				});
				console.log('this.productsList',this.productsList);
			}else{

			}
		});
  	}
}
