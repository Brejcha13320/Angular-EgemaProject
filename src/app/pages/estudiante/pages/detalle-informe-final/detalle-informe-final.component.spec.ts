import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleInformeFinalComponent } from './detalle-informe-final.component';

describe('DetalleInformeFinalComponent', () => {
  let component: DetalleInformeFinalComponent;
  let fixture: ComponentFixture<DetalleInformeFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleInformeFinalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleInformeFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
