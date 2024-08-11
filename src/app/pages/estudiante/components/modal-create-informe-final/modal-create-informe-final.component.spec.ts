import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateInformeFinalComponent } from './modal-create-informe-final.component';

describe('ModalCreateInformeFinalComponent', () => {
  let component: ModalCreateInformeFinalComponent;
  let fixture: ComponentFixture<ModalCreateInformeFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCreateInformeFinalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCreateInformeFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
