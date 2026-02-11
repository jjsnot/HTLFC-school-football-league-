import { TestBed } from '@angular/core/testing';

import { Bettservice } from './bettservice.service';

describe('Betsservice', () => {
  let service: Bettservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bettservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
