import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvegetablesComponent } from './addvegetables.component';

describe('AddvegetablesComponent', () => {
  let component: AddvegetablesComponent;
  let fixture: ComponentFixture<AddvegetablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddvegetablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddvegetablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
