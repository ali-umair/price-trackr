import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanNewComponent } from './scan-new.component';

describe('ScanNew', () => {
  let component: ScanNewComponent;
  let fixture: ComponentFixture<ScanNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScanNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
