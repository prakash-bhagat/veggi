import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsDataUserEndComponent } from './contacts-data-user-end.component';

describe('ContactsDataUserEndComponent', () => {
  let component: ContactsDataUserEndComponent;
  let fixture: ComponentFixture<ContactsDataUserEndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsDataUserEndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsDataUserEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
