import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Values } from '../../providers/values';
import { ServiceProvider } from '../../providers/service';
import { Router } from '@angular/router';

import { TokenProvider } from '../../providers/token/token';
import { OrderProvider } from '../../providers/order/order';
import { UsersProvider } from '../../providers/users/users';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  loading:any;
	zeroPrice: any;
	form: any;
	payment_method: any;
	cod: any;
  token:any;
	
	empty_cart: any;
	user: any;
	currentUserAddress: any;
	userProfiles: any;
  smallUserProfiles: any;
	payments: any;
	paypalConfigurations: any;
	getPayments: any;
	paypalPayments: any;
	disableSubmit: boolean = false;
	buttonText: any;
	currentUser: any;
	getToken: any;

  constructor(
		public service: ServiceProvider, 
    public toastController: ToastController, 
    public loadingCtrl: LoadingController,
		private router: Router,  
    private usersProvider: UsersProvider,
		public tokenProvider : TokenProvider,
    public values:Values,
		public storage : Storage,
		public orderProvider : OrderProvider) {
			
			this.form = {};
			this.payments = [];
			this.empty_cart = "assets/imgs/empty-cart.png";
	}
		
  ngOnInit() {
  }
		  
  addToCart(id){
 
    for(let item in this.service.cart.line_items){
      if(id == this.service.cart.line_items[item].product_id){
        this.service.cart.line_items[item].quantity += 1;
        this.service.proqty[id] += 1;
        this.service.total += parseFloat(this.service.cart.line_items[item].price);
        this.values.qty += 1;
      }
    }
  }
  
  deleteFromCart(id){
    for(let item in this.service.cart.line_items){
      if(id == this.service.cart.line_items[item].product_id){
        this.service.cart.line_items[item].quantity -= 1;
        this.service.proqty[id] -= 1;
        this.values.qty -= 1;
        this.service.total -= parseFloat(this.service.cart.line_items[item].price);
        if(this.service.cart.line_items[item].quantity == 0){
			
			 for(let extras in this.service.cart.line_items[item].extra){
				//this.service.cart.line_items[item].extra[extras].quantity -= 1;
				//if(id == this.service.cart.line_items[item].extra[extras].id){
					this.zeroPrice = this.service.cart.line_items[item].extra[extras].value *this.service.cart.line_items[item].extra[extras].quantity;
					
					this.service.total -= parseFloat(this.zeroPrice);
					
	
				//}
				
			 }
			
          this.service.cart.line_items.splice(item, 1);
		  
			 
        }
      }
    }
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
  
  placeOrder(item){
    this.disableSubmit = true;
    this.buttonText = "Placing Order";

    // begin
    this.storage.get('auth-token').then(token => {
      if(token){
        this.usersProvider.GetUserByToken(token).subscribe(data => {
          this.token = token;
          this.user = data.details;
          if(this.user){

              /*if( this.form.payment_method == "paypal"){
                this.payPal.init({
                  PayPalEnvironmentProduction: this.paypalConfigurations.production,
                  PayPalEnvironmentSandbox: this.paypalConfigurations.sandbox
				 
				 

                }).then(() => {
                
                   this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
                
                
                })).then(() => {
                 this.disableSubmit = false;
                 let payment = new PayPalPayment(this.service.total.toString(), this.values.currency, 'Sales of Goods', 'sale');
                    this.payPal.renderSinglePaymentUI(payment).then((success) => {

                        this.paypalPayments =success;
                   
                        this.payments.paymentType = this.form.payment_method;
						            //this.currentUserAddress = this.form.currentUserAddress;

                        this.payments.id = this.paypalPayments.response.id;
                        this.payments.status = this.paypalPayments.response.state;
                        this.disableSubmit = false;
                        //this.customerDetails = this.userProfiles;

            						this.smallUserProfiles = [];


            					  this.smallUserProfiles.address = this.userProfiles.address;
            					  this.smallUserProfiles.displayName = this.userProfiles.displayName;
            					  this.smallUserProfiles.email = this.userProfiles.email;
            					  this.smallUserProfiles.facebook = this.userProfiles.facebook;
            					  this.smallUserProfiles.lastName = this.userProfiles.lastName;
            					  this.smallUserProfiles.lat = this.userProfiles.lat;
            					  this.smallUserProfiles.lng = this.userProfiles.lng;
            					  this.smallUserProfiles.phone = this.userProfiles.phone;
            					  this.smallUserProfiles.photoURL = this.userProfiles.photoURL;
            					  this.smallUserProfiles.reverseOrder = this.userProfiles.reverseOrder;
            					  this.smallUserProfiles.timeStamp = this.userProfiles.timeStamp;
            					  this.smallUserProfiles.userTimeStamp = this.userProfiles.userTimeStamp;


                        alert('Your order has been placed Successfully');
                       
                      }, (error) => {
                        // Error or render dialog closed without being successful
                        console.log(error);
                        alert('Error');
                      });

                      }, (error) => {
                      // Error in configuration
                        console.log(error);
                        alert('Error1');
                      });
                       }, (error) => {
                      console.log(error);
                      // Error in initialization, maybe PayPal isn't supported or something else
                      alert('Error2');
                      this.disableSubmit = false;
                  });
              }


              else if( this.form.payment_method == "stripe"){
               

                  if(this.currentUserAddress != undefined && this.userProfiles.address != undefined && this.userProfiles.phone != undefined){

                    //this.stripe.setPublishableKey(this.setting.publish_key);

            				this.stripe.setPublishableKey(publishableKey);

            				alert(this.form.stripe_number);
                    let card = {
                     number: this.form.stripe_number,
                     expMonth: this.form.stripe_exp_month,
                     expYear: this.form.stripe_exp_year,
                     cvc: this.form.stripe_code
                    };

                    this.stripe.createCardToken(card)
                      .then((token) =>{
                          console.log(token);
                          this.getToken = token;

						              alert("token:"+token.id);

                          if(this.getToken){
                              alert("this.gettoken:"+this.getToken.id); //this.service.chargeStripe(this.getToken, this.values.currency, this.service.total, this.setting.secret_kay)
						


                          }

                            this.payments.paymentType = this.form.payment_method;
						                 console.log(this.getPayments);
				

					                      this.smallUserProfiles = [];


              					  this.smallUserProfiles.address = this.userProfiles.address;
              					  this.smallUserProfiles.displayName = this.userProfiles.displayName;
              					  this.smallUserProfiles.email = this.userProfiles.email;
              					  this.smallUserProfiles.facebook = this.userProfiles.facebook;
              					  this.smallUserProfiles.lastName = this.userProfiles.lastName;
              					  this.smallUserProfiles.lat = this.userProfiles.lat;
              					  this.smallUserProfiles.lng = this.userProfiles.lng;
              					  this.smallUserProfiles.phone = this.userProfiles.phone;
              					  this.smallUserProfiles.photoURL = this.userProfiles.photoURL;
              					  this.smallUserProfiles.reverseOrder = this.userProfiles.reverseOrder;
              					  this.smallUserProfiles.timeStamp = this.userProfiles.timeStamp;
              					  this.smallUserProfiles.userTimeStamp = this.userProfiles.userTimeStamp;


                            this.disableSubmit = false;
                            alert('Your order has been placed Successfully');
                            
                      })
                      .catch((error) =>{
                          this.disableSubmit = false;
                          alert('Errors');
                          this.disableSubmit = false;
                          console.error(error)})
                      .catch((error) =>{
                          alert('Error1');
                          this.disableSubmit = false;
                      });
                  }
              }*/

            //if (this.form.payment_method == "cod" || this.form.payment_method == "bank" || this.form.payment_method == "cart") {
              /**start here**/
                    //if(this.currentUserAddress != undefined){
                      //this.payments.PaymentType = this.form.payment_method;
                      var itemlist=[];

                      item.forEach( snap =>{
                        let bbr = {
                          item_id: snap.product_id,
                          price: snap.price,
                          qty: snap.quantity
                        }
                        itemlist.push(bbr);
                      });

                      
                      this.presentLoading();
                      let body = {
                        cart: itemlist,
                        merchant_id: item[0].restaurantId,
                        table_id: item[0].restaurantId,
                        client_token: this.token,
                        //user: this.user._id,
                        //address: this.currentUserAddress.id,
                        //total: this.service.total,
                        //payments: this.payments.PaymentType,
                        //image: snap.image,
                        //name: snap.name,
                        //owner_id: snap.owner_id,
                        //price: snap.price,
                        //product_id: snap.product_id,
                        //quantity: snap.quantity,
                        //restaurantName: snap.restaurantName,
                        //status: "Queued",
                      }
                      this.orderProvider.addOrder(body).subscribe(data => {
                        this.stopLoading();
                        if(data.code==1){
                          this.presentToast(data.msg,'success');
                          this.service.cart.line_items = [];
                          this.values.qty = null;
                          this.service.proqty = [];
                          this.service.total = 0;
                          this.router.navigateByUrl('/orders');
                        }else{
                          this.presentToast(data.msg,'danger');
                        }
                      });
                    //}
            //}
          }
          else
          {
            this.router.navigateByUrl('/home');
          }
        });
      }
    });
  }

  radioChecked(val){
    this.form.payment_method = val;
  }
}
