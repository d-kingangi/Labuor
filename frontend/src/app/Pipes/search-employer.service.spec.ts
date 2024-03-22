import { TestBed } from '@angular/core/testing';

import { SearchEmployerService } from './search-employer.service';

describe('SearchEmployerService', () => {
  let service: SearchEmployerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchEmployerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
