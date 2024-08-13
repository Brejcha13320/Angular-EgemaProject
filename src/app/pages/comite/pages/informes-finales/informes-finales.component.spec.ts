import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesFinalesComponent } from './informes-finales.component';

describe('InformesFinalesComponent', () => {
  let component: InformesFinalesComponent;
  let fixture: ComponentFixture<InformesFinalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformesFinalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformesFinalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
