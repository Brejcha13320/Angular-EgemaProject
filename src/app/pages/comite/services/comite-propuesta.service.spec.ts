import { TestBed } from '@angular/core/testing';

import { ComitePropuestaService } from './comite-propuesta.service';

describe('ComitePropuestaService', () => {
  let service: ComitePropuestaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComitePropuestaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
