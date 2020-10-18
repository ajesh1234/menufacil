import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Values } from '../../providers/values';
import { ServiceProvider } from '../../providers/service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Stripe } from '@ionic-native/stripe/ngx';

import { TokenProvider } from '../../providers/token/token';
import { OrderProvider } from '../../providers/order/order';
import { UsersProvider } from '../../providers/users/users';

//const publishableKey = 'pk_test_sBkfyPHddnLGw7wljFrvZicW';
//const stripe_secret_key = 'sk_test_mirrQ5hTnI8Ggpr6nsHiAY93';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  id:any;
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
  orderDetails : any;

  constructor(
		public service: ServiceProvider, 
    public toastController: ToastController, 
    public loadingCtrl: LoadingController,
        private stripe: Stripe,
		private router: Router,  
    private route: ActivatedRoute,
    private usersProvider: UsersProvider,
		public tokenProvider : TokenProvider,
    public values:Values,
		public storage : Storage,
		public orderProvider : OrderProvider) {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.storage.get('auth-token').then(token => {
        if(token){
          this.token = token;
          let body = {
            client_token: this.token,
            order_id: this.id
          }
          this.orderProvider.getAllOrders(body).subscribe(data => {
              this.orderDetails = data.details;
          });
        }
        else{
           this.router.navigateByUrl('/home');
        }
      });                                         
    });
			
			this.form = {};
			this.payments = [];
			this.empty_cart = "assets/imgs/empty-cart.png";
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
  
  placeOrder(){
    // begin
    this.storage.get('auth-token').then(token => {
      if(token){
        this.usersProvider.GetUserByToken(token).subscribe(data => {
          this.token = token;
          this.user = data.details;
          if(this.user){
            this.presentLoading();

              if( this.form.payment_method == "stripe"){

                    //this.stripe.setPublishableKey(this.setting.publish_key);

            				this.stripe.setPublishableKey(this.orderDetails.publish_key);
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

						              //alert("token:"+token.id);

                          if(this.getToken){
                              //alert("this.gettoken:"+); //this.service.chargeStripe(this.getToken, this.values.currency, this.service.total, this.setting.secret_kay)
                              let body = {
                                merchant_id: this.orderDetails.mtid,
                                tbl_id: this.orderDetails.tbl_id,
                                order_id: this.id,
                                stripe_token: this.getToken.id,
                                total_w_tax: this.orderDetails.totalpay,
                                client_token: this.token
                              }
                              this.orderProvider.getpayment(body).subscribe(data => {
                                if(data.code==1){
                                  this.stopLoading();
                                  this.presentToast(data.msg,'success');
                                  this.router.navigateByUrl('/orders');
                                }else{
                                  this.stopLoading();
                                  this.presentToast(data.msg,'danger');
                                }

                              });
                          } 
                      })
                      .catch((error) =>{
                        this.stopLoading();
                        this.presentToast(error,'danger');
                          })
                      .catch((error) =>{
                        this.stopLoading();
                        this.presentToast(error,'danger');
                      });
              }

              else if (this.form.payment_method == "cod") {
                /**start here**/
                
                      //this.presentLoading();
                      let body = {
                        merchant_id: this.orderDetails.mtid,
                        tbl_id: this.orderDetails.tbl_id,
                        order_id: this.id,
                        total_w_tax: this.orderDetails.totalpay,
                        client_token: this.token
                      }
                      this.orderProvider.getcodpayment(body).subscribe(data => {
                        this.stopLoading();
                        if(data.code==1){
                          this.presentToast(data.msg,'success');
                          this.router.navigateByUrl('/orders');
                        }else{
                          this.presentToast(data.msg,'danger');
                        }
                      });
              }
              else{
                this.stopLoading();
                this.presentToast('Select your payment type','danger');
              }
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
    this.cod=val;
  }
}
