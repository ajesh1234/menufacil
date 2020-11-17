import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsNearPageRoutingModule } from './products-near-routing.module';

import { ProductsNearPage } from './products-near.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsNearPageRoutingModule
  ],
  declarations: [ProductsNearPage]
})
export class ProductsNearPageModule {}
