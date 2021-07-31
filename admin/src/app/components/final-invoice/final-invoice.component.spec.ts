import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalInvoiceComponent } from './final-invoice.component';

describe('FinalInvoiceComponent', () => {
  let component: FinalInvoiceComponent;
  let fixture: ComponentFixture<FinalInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
