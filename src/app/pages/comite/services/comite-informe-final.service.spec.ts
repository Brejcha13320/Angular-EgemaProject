import { TestBed } from '@angular/core/testing';

import { ComiteInformeFinalService } from './comite-informe-final.service';

describe('ComiteInformeFinalService', () => {
  let service: ComiteInformeFinalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComiteInformeFinalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
