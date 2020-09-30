import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs-compat/Observable';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import {map} from 'rxjs/Operator/map';
import { URLSearchParams , Headers} from '@angular/http';





@Injectable()
export class ServiceProvider {


	product_id: Array<number> = [];
	url: any;
	cart: any;
	params:any;
	orderLists: any;
	public ref: any;  
	productsList:any;
	customerList: any;
	public orderList: any;
	
	
	total: number = 0;
	proqty: Array<number> = [];
	getSecKey: any;
	users: any;
	

	public fireAuth: any;
	public restaurantUserInfo : any;
	public restaurants : any;
	public restaurantCategory : any;
	public category: any;
	public restaurantItems: any;
	public items: any;
	public currentUser: any;
	public userAddressList: any;
	
	public cityName: any;
	public cityDistrictName: any;
	public streetName: any;
	public apartmentOfficeName: any;
	public categorizedOrders: any;
	public favoriteItem: any;
	public favoriteItemList: any;
	public chats: any;
	public userChatList: any;
	public allChoosenItems: any;
	
	public hotelCords: any;

  constructor( 
  	public facebook: Facebook, 
  	public alertCtrl: AlertController,
	public http: HttpClient  ) 
	{
		this.cart = { 
	  		"line_items": [],
			"extraOptions": [] 
		};  
  	}
}