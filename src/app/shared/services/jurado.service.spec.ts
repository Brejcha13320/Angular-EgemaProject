import { TestBed } from '@angular/core/testing';

import { JuradoService } from './jurado.service';

describe('JuradoService', () => {
  let service: JuradoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JuradoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
