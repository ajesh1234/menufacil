import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

// Configuración de traducción
import { customTranslateLoader } from '../app.module';

import { TranslatePageRoutingModule } from './translate-routing.module';

import { TranslatePage } from './translate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: customTranslateLoader,
        deps: [HttpClient]
      }
    }),
    TranslatePageRoutingModule
  ],
  declarations: [TranslatePage]
})
export class TranslatePageModule {}
