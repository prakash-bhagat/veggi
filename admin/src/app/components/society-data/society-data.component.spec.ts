import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyDataComponent } from './society-data.component';

describe('SocietyDataComponent', () => {
  let component: SocietyDataComponent;
  let fixture: ComponentFixture<SocietyDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocietyDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
