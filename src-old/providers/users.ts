

import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs-compat/Observable';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Injectable()
export class UsersProvider {

  private snapshotChangesSubscription: any;

  downloadURL: Observable<string>;
  
  /**added**/
  public fireAuth : any;
  public restaurantUserInfo: any;

  constructor(public facebook: Facebook, public alertCtrl: AlertController ) {
	  
	  
	  
  }

  

}
