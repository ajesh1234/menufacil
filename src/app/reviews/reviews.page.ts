import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Values } from '../../providers/values';
import { ServiceProvider } from '../../providers/service';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';

import { OrderProvider } from '../../providers/order/order';
import { TokenProvider } from '../../providers/token/token';
import { UsersProvider } from '../../providers/users/users';
import * as moment from 'moment';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {

  currentUser: any;
  myOrderListflag: Boolean = false;
  loading: any;
	myOrderList: any;
	myOrderListReverse: any;
  id:any;
	token:any;
  params:any = {};
  user: any;

  constructor( 
  public service: ServiceProvider, 
  public values:Values,
  private router: Router, 
  private route: ActivatedRoute, 
  public loadingCtrl: LoadingController,
  public toastController: ToastController,
  public tokenProvider: TokenProvider,
  public orderProvider: OrderProvider,
  private usersProvider: UsersProvider,
  public storage : Storage) {

    this.route.params.subscribe(params => {
      this.id = params.mid;
    });
	
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.presentLoading();
    this.storage.get('auth-token').then(token => {
      if(token){
        this.usersProvider.GetUserByToken(token).subscribe(data => {
          this.token = token;
          this.user = data.details;
          console.log(this.user);
          if(this.user){
            this.orderProvider.GetReviews(this.token,this.id).subscribe(data => {
              this.stopLoading();
              this.myOrderListflag=false;
              if(data.details.length==0){
                this.myOrderListflag=true;
              }else{
              this.myOrderList = [];
              this.myOrderListReverse = [];
              this.myOrderListReverse = data.details.reverse();
              this.myOrderListReverse.forEach( snap => {
                    this.myOrderList.push({
                      id: snap.id,
                      avatar: snap.avatar,
                      client_name: snap.client_name,
                      rating: snap.rating,
                      date_created: snap.date_created,
                      review: snap.review,
                   });
                });
              }
            });
          }
          else
          {
            this.router.navigateByUrl('/home');
          }
        });
      }
      else{
         this.router.navigateByUrl('/home');
       }
    });
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
}
