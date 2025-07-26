import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanPriceComponent } from './scan-price.component';

describe('ScanPrice', () => {
  let component: ScanPriceComponent;
  let fixture: ComponentFixture<ScanPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScanPriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
