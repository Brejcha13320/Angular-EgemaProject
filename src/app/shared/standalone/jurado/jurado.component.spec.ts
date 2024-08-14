import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuradoComponent } from './jurado.component';

describe('JuradoComponent', () => {
  let component: JuradoComponent;
  let fixture: ComponentFixture<JuradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuradoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JuradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
