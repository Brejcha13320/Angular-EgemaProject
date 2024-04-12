import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateArchivosComponent } from './modal-update-archivos.component';

describe('ModalUpdateArchivosComponent', () => {
  let component: ModalUpdateArchivosComponent;
  let fixture: ComponentFixture<ModalUpdateArchivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalUpdateArchivosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalUpdateArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
