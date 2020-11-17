import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductsNearPage } from './products-near.page';

describe('ProductsNearPage', () => {
  let component: ProductsNearPage;
  let fixture: ComponentFixture<ProductsNearPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsNearPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsNearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
