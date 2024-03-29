import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewAddressPageRoutingModule } from './new-address-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewAddressPage } from './new-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	ReactiveFormsModule,
    NewAddressPageRoutingModule
  ],
  declarations: [NewAddressPage]
})
export class NewAddressPageModule {}
