import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CategoryProvider } from '../../providers/category/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  	categoryList: any;
	id: any;
	restaurantName: any;
	socket: any;

  	constructor(
		public loadingCtrl: LoadingController, 
		private route: ActivatedRoute,
		public toastCtrl: ToastController, 
		private storage: Storage,
		public socialSharing: SocialSharing,
		public categoryProvider: CategoryProvider
  	) 
  	{
		this.route.params.subscribe(params => {
			
			this.id = params.id;
			this.restaurantName = params.name;
			
			this.categoryProvider.GetCategoryByRestaurant(this.id,'en','').subscribe(data => {
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
}
