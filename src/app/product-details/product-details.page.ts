import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Values } from '../../providers/values';
import { ItemProvider } from '../../providers/item/item';
import { UsersProvider } from '../../providers/users/users';
import { ServiceProvider } from '../../providers/service';
import { TokenProvider } from '../../providers/token/token';
import { CategoryProvider } from '../../providers/category/category';

import * as _ from 'lodash';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  quantity: any;
	id: any;
	title: any;
	owner_id: any;
	product_id: any;
	restaurantId: any;
	restaurantName: any;
	params:any = {};
	cartsItem: any = {};
	cartItem: any = {};
	extraPrice: any;
	favorite: boolean = false;
	customers: any;
	categoryList: any;
	
	slidePerViewOpts = {
		speed: 1000,
		spaceBetween: 8,
		loop: true,
		autoplay: {
			delay: 3500,
		},
		slidesPerView: 2,
	};

	slidePerViewOpts2 = {
		speed: 1000,
		spaceBetween: 16,
		loop: true,
		autoplay: {
			delay: 3500,
		},
		slidesPerView: 4,
	};

  constructor(
		public loadingCtrl: LoadingController, 
		private route: ActivatedRoute,
		public toastCtrl: ToastController, 
		private storage: Storage,
		public socialSharing: SocialSharing,
		public values:Values, 
		public itemProvider: ItemProvider,
		public service: ServiceProvider,
		private usersProvider: UsersProvider,
		private tokenProvider: TokenProvider,
		public categoryProvider: CategoryProvider
  ) { 
	
		this.quantity = "1";
	
		this.route.params.subscribe(params => {

			this.id = params.id;
			this.restaurantId = params.restaurantId;
	
			this.params.data = [];

		  	this.itemProvider.getItem(this.id,this.restaurantId).subscribe(data => {
		   
		   console.log(data);
				this.params.data.items = [];
				this.customers = [];

				this.params.data.id= data.details.item_id;
				this.params.data.available= data.details.not_available;
				this.params.data.description= data.item.item_description;
				this.params.data.name= data.item.item_name;
				this.params.data.percent= data.item.itemPercent;
				this.params.data.price= data.item.itemPrice;
				this.params.data.real_price= data.item.itemPrice;
				this.params.data.restaurantId = this.restaurantId;
				this.params.data.image= "https://res.cloudinary.com/funnyionic/image/upload/v" + data.item.itemImgVersion + "/" + data.item.itemImgId;
				//this.customers = data.item.customers;

				/*this.storage.get('auth-token').then(token => {
					if(token){
				  		this.tokenProvider.GetPayload().then(value => {
							var b = _.find(this.customers, ['userId._id', value._id]);
				
							if(_.isObject(b)){
								this.favorite = true;
							}
							else
							{
								this.favorite = false;
							}
				  		});
					}
					else
					{
				   
				   
				 	}
		 		});*/
		  	});	
		});
  	}

  	ngOnInit() {
  	}
  
  	addToCart(name, price, image,extra){


      var itemAdded = false;
      for(let item in this.service.cart.line_items){
        if(this.id == this.service.cart.line_items[item].product_id){

		this.extraPrice = 0;
		this.cartsItem = [];
        this.service.proqty[this.id] += 1;

		console.log(this.service.proqty[this.id]);
        this.cartsItem.name = name;
        this.cartsItem.image = image;
        this.cartsItem.price = price;
		this.cartsItem.product_id = this.id;
		this.cartsItem.restaurantId = this.restaurantId;
		this.cartsItem.restaurantName = this.restaurantName;
		this.cartsItem.owner_id = this.owner_id;

		this.cartsItem.quantity = this.service.cart.line_items[item].quantity;

		this.cartsItem.extra = [];

		this.service.cart.line_items[item] = [];


		this.service.cart.line_items[item].image = this.cartsItem.image;

		this.service.cart.line_items[item].name = this.cartsItem.name;

		this.service.cart.line_items[item].product_id = this.cartsItem.product_id;



		this.service.cart.line_items[item].price = this.cartsItem.price;

		this.service.cart.line_items[item].quantity = this.cartsItem.quantity;

		this.service.cart.line_items[item].restaurantId = this.cartsItem.restaurantId;
		this.service.cart.line_items[item].restaurantName = this.cartsItem.restaurantName;
		this.service.cart.line_items[item].owner_id = this.cartsItem.owner_id;


		  this.service.cart.line_items[item].quantity += 1;

		 

		  console.log(this.service.cart.line_items[item].quantity);
          this.service.proqty[this.id] += 1;
		  console.log(this.service.proqty[this.id]);


          this.service.total += parseFloat(this.service.cart.line_items[item].price);



		  
		  console.log(this.service.total);
          this.values.qty += 1;

		  console.log(this.values.qty);
          var itemAdded = true;
		  console.log(this.service.cart.line_items);

		  console.log(this.service.cart);
        }
      }

      if(!itemAdded){
		  console.log(itemAdded);

	



		  this.cartItem = [];





        this.cartItem.product_id = this.id;
		console.log(this.cartItem.product_id );

        this.cartItem.quantity = 1;
        this.service.proqty[this.id] = 1;

		console.log(this.service.proqty[this.id]);
        this.cartItem.name = name;
        this.cartItem.image = image;
        this.cartItem.price = price;

		this.cartItem.restaurantId = this.restaurantId;
		this.cartItem.restaurantName = this.restaurantName;
		this.cartItem.restaurantName = this.owner_id;

		console.log(this.cartItem.restaurantId);

        this.service.total += parseFloat(price);
	
		console.log(this.service.total);
        this.values.qty += 1;
		console.log(this.values.qty);



        this.service.cart.line_items.push(this.cartItem);

		console.log(this.cartItem);
	



        console.log(this.service.cart.line_items);
	

		console.log(this.service.cart);
      }

      this.cartItem = {};

  	}
  
  	addToFavourite(id,restaurantId,restaurantName){
	  
	  console.log(restaurantName);
	  
	  this.usersProvider.AddToWishlist(id,restaurantId,restaurantName).subscribe(data => {
                console.log(data);

                this.favorite = true;
				//this.success();
				
				//this.router.navigateByUrl('/home');
				
       });
	  
	  console.log(id);
  	}
  
  	removeFavourite(id){
	  
	  this.usersProvider.RemoveFromWishlist(id).subscribe(data => {
                console.log(data);

                this.favorite = false;
				//this.success();
				
				//this.router.navigateByUrl('/home');
				
       });
  	}
}
