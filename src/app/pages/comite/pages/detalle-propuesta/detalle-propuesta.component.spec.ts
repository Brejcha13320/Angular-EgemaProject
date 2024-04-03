import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePropuestaComponent } from './detalle-propuesta.component';

describe('DetallePropuestaComponent', () => {
  let component: DetallePropuestaComponent;
  let fixture: ComponentFixture<DetallePropuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetallePropuestaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallePropuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
