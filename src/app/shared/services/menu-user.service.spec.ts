/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MenuUserService } from './menu-user.service';

describe('Service: MenuUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuUserService]
    });
  });

  it('should ...', inject([MenuUserService], (service: MenuUserService) => {
    expect(service).toBeTruthy();
  }));
});
