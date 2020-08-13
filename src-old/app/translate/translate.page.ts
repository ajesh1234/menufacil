import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.page.html',
  styleUrls: ['./translate.page.scss'],
})
export class TranslatePage implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }
  
  cambiaIdioma(idioma: string) {
    console.log(`Traduzco a: ${idioma}`);
    this.translate.use(idioma);
  }

}
