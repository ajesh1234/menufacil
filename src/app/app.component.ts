import { Component , OnInit } from '@angular/core';

import { Platform, MenuController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

import { environment } from '../environments/environment';

import { Values } from '../providers/values';

import { tap } from 'rxjs/operators';

import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';


import { TranslateService } from '@ngx-translate/core'; // add this

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { TokenProvider } from '../providers/token/token';
import { UsersProvider } from '../providers/users/users';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
	
  menu = [];
  user: any;
  
  public fireAuth: any;
  public userProfiles: any;	
	
  public selectedIndex = 0;
  public appPages = [
	{
      title: 'Restaurants',
      url: '/home',
	  component: 'HomePage',
      icon: 'restaurant'
    },
	/*{
      title: 'My Cart',
      url: '/cart',
	  component: 'CartPage',
      icon: 'basket'
    },
	{
      title: 'My Order',
      url: '/orders',
	  component: 'OrdersPage',
      icon: 'folder'
    },
	{
      title: 'Map',
      url: '/map',
	  component: 'MapPage',
      icon: 'locate'
    },
	{
      title: 'Language',
      url: '/translate',
	  component: 'TranslatePage',
      icon: 'globe'
    },
	{
      title: 'Settings',
      url: '/settings',
	  component: 'SettingsPage',
      icon: 'settings'
    },*/
	/*{
      title: 'Wishlist',
      url: '/wishlist',
	  component: 'WishlistPage',
      icon: 'heart'
    },	
	{
      title: 'My Addresses',
      url: '/address',
	  component: 'AddressPage',
      icon: 'folder-open'
    },*/
	{
      title: 'Change Password',
      url: '/profile',
	  component: 'ProfilePage',
      icon: 'aperture'
    },
	/*{
      title: 'Add New Address',
      url: '/new-address',
	  component: 'NewAddressPage',
      icon: 'add-circle'
    },*/
	{
      title: 'Profile',
      url: '/upload',
	  component: 'UploadPage',
      icon: 'camera'
    }];
	
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    public toastCtrl: ToastController,
    public menuCtrl: MenuController, 
    private storage: Storage, 
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public values: Values,
	private translate: TranslateService,
	private geo: Geolocation,
	public tokenProvider: TokenProvider,
    public usersProvider: UsersProvider
  ) {
    this.Init();
	
		this.initializeApp();
		
		let userLang = navigator.language.split('-')[0];
    userLang = /(english|deutsch)/gi.test(userLang) ? userLang : 'english';
    this.translate.use(userLang);
  }

  Init(){
    this.translate.setDefaultLang('english');


  this.storage.get('auth-token').then(token => {
    if(token){
      this.tokenProvider.GetPayload().then(value => {
        //this.user = value;

        this.usersProvider.GetUserByToken(token).subscribe(data => {
            this.user = data.details;

            console.log(this.user);
        });

        console.log(this.user);
      });

      this.router.navigateByUrl('/home');
	  this.menuCtrl.enable(true);
    }
    else{
       this.router.navigateByUrl('/list');
	   this.menuCtrl.enable(false);
     }
    });
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

        this.storage.get('auth-token').then(token => {
            if(token){
              this.tokenProvider.GetPayload().then(value => {
                //this.user = value;

                this.usersProvider.GetUserByToken(token).subscribe(data => {
                    this.user = data.details;

                    console.log(this.user);
                });

                console.log(this.user);
              });

              this.router.navigateByUrl('/home');
			  this.menuCtrl.enable(true);
            }
            else{
               this.router.navigateByUrl('/list');
			   this.menuCtrl.enable(false);
             }
        });

    });
  }
  
  logout(){
   // this.fireAuth.signOut();
   //this.tokenProvider.DeleteToken();
   this.tokenProvider.DeleteToken();
   console.log('logged out');
	 this.router.navigateByUrl('/list');
	 this.menuCtrl.enable(false);

  }
  
  ngOnInit(){
	  
	  
  }
}
