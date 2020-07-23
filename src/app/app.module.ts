import { NgModule , Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';



import { environment } from '../environments/environment';
import { Values } from '../providers/values';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { Stripe } from '@ionic-native/stripe/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Geolocation } from '@ionic-native/geolocation/ngx';


import { AuthProvider } from '../providers/auth/auth';
import { TokenProvider } from '../providers/token/token';
import { TokenInterceptor } from '../providers/token-interceptor';
import { MessageProvider } from '../providers/message/message';
import { PostProvider } from '../providers/post/post';
import { UsersProvider } from '../providers/users/users';
import { CategoryProvider } from '../providers/category/category';
import { ItemProvider } from '../providers/item/item';
import { RestaurantProvider } from '../providers/restaurant/restaurant';
import { OrderProvider } from '../providers/order/order';
import { ServiceProvider } from '../providers/service';
import { AddressProvider } from '../providers/address/address';

import { CityProvider } from '../providers/city/city';
import { DistrictProvider } from '../providers/district/district';
import { StreetProvider } from '../providers/street/street';
import { ApartmentProvider } from '../providers/apartment/apartment';


export function customTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
	FormsModule,
	ReactiveFormsModule,
	HttpModule,
	HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
	HttpClientModule,
	TranslateModule.forRoot({
     loader: {
        provide: TranslateLoader,
        useFactory: customTranslateLoader,
        deps: [HttpClient]
     }
	}),
	IonicStorageModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
     StatusBar,
    SplashScreen,
	Values,
    Facebook,
    Stripe,
    CallNumber,
    SocialSharing,
    PayPal,
    InAppBrowser,
    Camera,
	Geolocation,
	 AuthProvider,
    TokenProvider,
    MessageProvider,
    PostProvider,
    UsersProvider,
    CategoryProvider,
    ItemProvider,
    RestaurantProvider,
    OrderProvider,
	ServiceProvider,
	AddressProvider,
	CityProvider,
	DistrictProvider,
	ApartmentProvider,
	StreetProvider,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
