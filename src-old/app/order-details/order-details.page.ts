import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Values } from '../../providers/values';
import { ServiceProvider } from '../../providers/service';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { Stripe } from '@ionic-native/stripe/ngx';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';

import { OrderProvider } from '../../providers/order/order';
import { TokenProvider } from '../../providers/token/token';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  myOrderList: any;
	id:any;
	
	orderDetails : any;
	addresses : any;

  constructor(
  public service: ServiceProvider, 
  public values:Values, 
  private payPal: PayPal, 
  private stripe: Stripe,
  private router: Router, 
  private route: ActivatedRoute,
  public tokenProvider: TokenProvider,
    public orderProvider: OrderProvider,
    public storage : Storage) { 
  
  
				this.route.params.subscribe(params => {
				
									console.log(params);
									this.id = params.id;
									
										this.orderProvider.getOrder(this.id).subscribe(data => {
											console.log(data);
											  this.orderDetails = data.order;
											  this.addresses = data.order.address;
										  });
																							
				});
  
  }

  ngOnInit() {
  }

}
