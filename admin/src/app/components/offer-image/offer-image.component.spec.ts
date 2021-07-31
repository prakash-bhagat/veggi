import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferImageComponent } from './offer-image.component';

describe('OfferImageComponent', () => {
  let component: OfferImageComponent;
  let fixture: ComponentFixture<OfferImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
