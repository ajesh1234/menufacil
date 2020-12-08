import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Values } from '../../providers/values';
import { ItemProvider } from '../../providers/item/item';
import { UsersProvider } from '../../providers/users/users';
import { ServiceProvider } from '../../providers/service';
import { TokenProvider } from '../../providers/token/token';

import * as _ from 'lodash';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  quantity: any;
	id: any;
	product_id: any;
	restaurantId: any;
	params:any = {};
	cartsItem: any = {};
	cartItem: any = {};
	priceval: any;
	priceexactval: any;
	device_id:any;
	loading:any;

  constructor(
		public loadingCtrl: LoadingController, 
		private route: ActivatedRoute, 
		public toastController: ToastController, 
		private storage: Storage,
		public values:Values, 
		public itemProvider: ItemProvider,
		public service: ServiceProvider,
		private usersProvider: UsersProvider,
		private tokenProvider: TokenProvider
  ) {
		this.quantity = 1;
		this.route.params.subscribe(params => {

			this.id = params.id;
			this.restaurantId = params.restaurantId;
			this.params.data = [];
		  	this.itemProvider.getItem(this.id,this.restaurantId).subscribe(data => {
				this.params.data.items = [];

				this.params.data.id= data.details.item_id;
				this.params.data.currency_symbol= data.details.currency_symbol;
				this.params.data.available= data.details.not_available;
				this.params.data.description= data.details.item_description;
				this.params.data.name= data.details.item_name;
				this.params.data.calories= data.details.calories;
				this.params.data.percent= data.details.itemPercent;
				this.params.data.price= data.details.prices[0].pretty_price;
				this.params.data.price1= data.details.prices[0].price;
				this.params.data.medium_price= data.details.medium_price;
				this.params.data.large_price= data.details.large_price;
				this.params.data.restaurantId = this.restaurantId;
				this.params.data.image= data.details.photo;
				this.params.data.dish= data.details.dish;
				this.params.data.len= this.params.data.dish.length;
				this.priceval='0';
		  	});	
		});
  	}

  	ngOnInit() {
  	}

  	async presentLoading() {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
  }

  async stopLoading() {
    if(this.loading != undefined){
      await this.loading.dismiss();
    }
    else{
      var self = this;
      setTimeout(function(){
        self.stopLoading();
      },1000);
    }
  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color,
      showCloseButton: true
    });
    toast.present();
  }
  
  	addToCart(){
  		if(this.priceval==0){
  			this.priceexactval=this.params.data.price1;
  		}else if(this.priceval==0){
  			this.priceexactval=this.params.data.medium_price;
  		}else{
  			this.priceexactval=this.params.data.large_price;
  		}

  		/*let body={
		  "item_id":this.id,
		  "qty":this.quantity,
		  "price":this.priceval,
		  'device_id':this.device_id  //cart category
		};*/


      var itemAdded = false;
      for(let item in this.service.cart.line_items){
        if(this.id == this.service.cart.line_items[item].product_id){

		this.cartsItem = [];
        this.service.proqty[this.id] += this.quantity;
        this.cartsItem.name = this.params.data.name;
        this.cartsItem.image = this.params.data.image;
        this.cartsItem.price = this.priceexactval;
		this.cartsItem.product_id = this.id;
		this.cartsItem.restaurantId = this.restaurantId;
		this.cartsItem.quantity = this.service.cart.line_items[item].quantity;

		this.service.cart.line_items[item] = [];
		this.service.cart.line_items[item].image = this.cartsItem.image;
		this.service.cart.line_items[item].name = this.cartsItem.name;
		this.service.cart.line_items[item].product_id = this.cartsItem.product_id;
		this.service.cart.line_items[item].price = this.cartsItem.price;
		this.service.cart.line_items[item].quantity = this.cartsItem.quantity;
		this.service.cart.line_items[item].restaurantId = this.cartsItem.restaurantId;
		this.service.cart.line_items[item].quantity += this.quantity;

        this.service.proqty[this.id] = this.quantity;

        this.service.total += parseFloat(this.service.cart.line_items[item].price) * this.quantity;
      	this.values.qty += this.quantity;
      	var itemAdded = true;
        }
      }

	if(!itemAdded){
		this.cartItem = [];
    	this.cartItem.product_id = this.id;

        this.cartItem.quantity = this.quantity;
        this.service.proqty[this.id] = this.quantity;
        this.cartItem.name = this.params.data.name;
        this.cartItem.image = this.params.data.image;
        this.cartItem.price = this.priceexactval;

		this.cartItem.restaurantId = this.restaurantId;
        this.service.total += parseFloat(this.cartItem.price) * this.quantity;
        this.values.qty += this.quantity;
		this.service.cart.line_items.push(this.cartItem);
      }
      this.cartItem = {};
  	}

    add(){
      this.quantity +=1;
    }

    remove(){
      if(this.quantity>1){
        this.quantity -=1; 
      }
    }
}
