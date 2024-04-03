import { TestBed } from '@angular/core/testing';

import { EstudiantePropuestaService } from './estudiante-propuesta.service';

describe('EstudiantePropuestaService', () => {
  let service: EstudiantePropuestaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstudiantePropuestaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
