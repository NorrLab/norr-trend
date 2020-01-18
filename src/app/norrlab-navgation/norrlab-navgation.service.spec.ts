import { TestBed } from '@angular/core/testing';

import { NorrlabNavgationService } from './norrlab-navgation.service';

describe('NorrlabNavgationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NorrlabNavgationService = TestBed.get(NorrlabNavgationService);
    expect(service).toBeTruthy();
  });
});
