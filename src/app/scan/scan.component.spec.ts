import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanComponent } from './scan.component';

describe('Scan', () => {
  let component: ScanComponent;
  let fixture: ComponentFixture<ScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
