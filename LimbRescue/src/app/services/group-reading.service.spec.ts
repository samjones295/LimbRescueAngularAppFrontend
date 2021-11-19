import { TestBed } from '@angular/core/testing';

import { GroupReadingService } from './group-reading.service';

describe('GroupService', () => {
  let service: GroupReadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupReadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
