import { TestBed } from '@angular/core/testing';

import { EstudianteInformeFinalService } from './estudiante-informe-final.service';

describe('EstudianteInformeFinalService', () => {
  let service: EstudianteInformeFinalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstudianteInformeFinalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
