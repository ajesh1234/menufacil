import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAddressPageRoutingModule } from './edit-address-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditAddressPage } from './edit-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	ReactiveFormsModule,
    EditAddressPageRoutingModule
  ],
  declarations: [EditAddressPage]
})
export class EditAddressPageModule {}
