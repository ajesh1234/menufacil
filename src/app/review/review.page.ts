import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Values } from '../../providers/values';
import { ServiceProvider } from '../../providers/service';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';

import { OrderProvider } from '../../providers/order/order';
import { TokenProvider } from '../../providers/token/token';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {

	id:any;
  token: any;
  loading: any;
  rating: any;
  review: any;
  errors : any = ['',null,undefined];
	
	orderDetails : any;

  constructor(
  public service: ServiceProvider, 
  public values:Values,
  private router: Router,
    public loadingCtrl: LoadingController, 
    public alertController: AlertController,
    public toastController: ToastController,  
  private route: ActivatedRoute,
  public tokenProvider: TokenProvider,
  public orderProvider: OrderProvider,
  public storage : Storage) { 
		this.route.params.subscribe(params => {
			this.id = params.id;
      this.storage.get('auth-token').then(token => {
        if(token){
          this.token = token;
          let body = {
            client_token: this.token,
            order_id: this.id
          }
          this.orderProvider.getOrder(body).subscribe(data => {
              this.orderDetails = data.details;
          });
        }
        else{
           this.router.navigateByUrl('/home');
        }
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

  reviewOrder(order_id){
    if(this.errors.indexOf(this.rating) != -1){
      this.presentToast('Please select rating','danger');
      return false;
    }else if(this.errors.indexOf(this.review) != -1){
      this.presentToast('Please enter review','danger');
      return false;
    }
    this.presentLoading();
          let body = {
            order_id: this.id,
            client_token: this.token,
            rating: this.rating,
            review: this.review
          }
      this.orderProvider.reviewOrder(body).subscribe(data =>{
        this.stopLoading();
        if(data.code==1){
          this.presentToast(data.msg,'success');
          this.router.navigateByUrl('/orders');
        }else{
          this.presentToast(data.msg,'danger');
        } 
      });
  }
}