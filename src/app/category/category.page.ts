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
	owner_id: any;
	socket: any;

  constructor(
		public loadingCtrl: LoadingController, 
		private route: ActivatedRoute,
		public toastCtrl: ToastController, 
		private storage: Storage,
		public socialSharing: SocialSharing,
		public categoryProvider: CategoryProvider
  ) { 
  
	
  
	this.route.params.subscribe(params => {
			
			console.log(params);
			
			this.id = params.id;
			this.restaurantName = params.name;
			this.owner_id = params.owner_id;
			
			
			this.categoryProvider.GetCategoryByRestaurant(this.id).subscribe(data => {
				  this.categoryList = [];
				  

					data.catsByRestaurant.forEach( snap =>{
					  this.categoryList.push({

							id: snap._id,
							category: snap.categoryName,
							title: snap.categoryName,
							subtitle: snap.categoryDescription,
							ionBadge: snap.categoryName,
							image: "https://res.cloudinary.com/funnyionic/image/upload/v" + snap.catImgVersion + "/" + snap.catImgId,
						});
					});
					
					

				  console.log(this.categoryList);
				});
			
		
				
				
				
		});
  
  
  }

  ngOnInit() {
  }

}
