import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudTrabajoGradoComponent } from './solicitud-trabajo-grado.component';

describe('SolicitudTrabajoGradoComponent', () => {
  let component: SolicitudTrabajoGradoComponent;
  let fixture: ComponentFixture<SolicitudTrabajoGradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudTrabajoGradoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudTrabajoGradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
