import { TestBed } from '@angular/core/testing';

import { ReadingDataService } from './reading-data.service';

describe('ReadingDataService', () => {
  let service: ReadingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
