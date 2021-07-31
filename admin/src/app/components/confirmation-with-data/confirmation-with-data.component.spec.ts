import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationWithDataComponent } from './confirmation-with-data.component';

describe('ConfirmationWithDataComponent', () => {
  let component: ConfirmationWithDataComponent;
  let fixture: ComponentFixture<ConfirmationWithDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationWithDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationWithDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
