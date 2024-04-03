import { TestBed } from '@angular/core/testing';

import { SolicitudTrabajoGradoService } from './solicitud-trabajo-grado.service';

describe('SolicitudTrabajoGradoService', () => {
  let service: SolicitudTrabajoGradoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudTrabajoGradoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
