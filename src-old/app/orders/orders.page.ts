import { Component, OnInit } from '@angular/core';
import { LoadingController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Values } from '../../providers/values';
import { ServiceProvider } from '../../providers/service';

import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { Stripe } from '@ionic-native/stripe/ngx';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';

import { OrderProvider } from '../../providers/order/order';
import { TokenProvider } from '../../providers/token/token';
import * as moment from 'moment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  currentUser: any;
		myOrderList: any;
		myOrderListReverse: any;
		id:any;

	    params:any = {};

	    user: any;

  constructor( 
  public service: ServiceProvider, 
  public values:Values, private payPal: PayPal, 
  private stripe: Stripe,
  private router: Router, private route: ActivatedRoute, 
  public loadingCtrl: LoadingController,
  public tokenProvider: TokenProvider,
    public orderProvider: OrderProvider,
    public storage : Storage) { 
	
		
	}

  ngOnInit() {
	  
	   this.storage.get('auth-token').then(token => {
      if(token){
        this.tokenProvider.GetPayload().then(value => {
          this.user = value;


            this.orderProvider.GetOrdersByUser(this.user._id).subscribe(data => {
                  console.log(data);
                  this.myOrderList = [];
				  this.myOrderListReverse = [];

                  this.myOrderListReverse = data.ordersByUser.reverse();
                 

                  this.myOrderListReverse.forEach( snap => {
					  
					  
					  
                        this.myOrderList.push({
                          id: snap._id,
                          status: snap.status,
                          itemName: snap.itemName,
                          itemPrice: snap.itemPrice,
                          quantity: snap.quantity,
                          itemImage: snap.itemImage,
                          paymentType: snap.paymentType,
                          created: snap.created,
                       });
                    });

                    console.log(this.myOrderList);
            });



        });


      }
      else{
         //this.nav.setRoot(HomePage);
       }
	});
  }
  
  GetPostTime(time){
    return moment(time).fromNow();
  }

}
