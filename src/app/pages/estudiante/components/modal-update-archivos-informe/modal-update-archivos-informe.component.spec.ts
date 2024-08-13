import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateArchivosInformeComponent } from './modal-update-archivos-informe.component';

describe('ModalUpdateArchivosInformeComponent', () => {
  let component: ModalUpdateArchivosInformeComponent;
  let fixture: ComponentFixture<ModalUpdateArchivosInformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalUpdateArchivosInformeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalUpdateArchivosInformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
