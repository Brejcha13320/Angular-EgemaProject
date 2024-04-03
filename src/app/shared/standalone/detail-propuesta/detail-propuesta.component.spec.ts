import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPropuestaComponent } from './detail-propuesta.component';

describe('DetailPropuestaComponent', () => {
  let component: DetailPropuestaComponent;
  let fixture: ComponentFixture<DetailPropuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailPropuestaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailPropuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
