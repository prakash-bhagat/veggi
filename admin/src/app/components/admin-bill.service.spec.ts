import { TestBed } from '@angular/core/testing';

import { AdminBillService } from './admin-bill.service';

describe('AdminBillService', () => {
  let service: AdminBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
