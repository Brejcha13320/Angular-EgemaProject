import { TestBed } from '@angular/core/testing';

import { ComiteReunionService } from './comite-reunion.service';

describe('ComiteReunionService', () => {
  let service: ComiteReunionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComiteReunionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
