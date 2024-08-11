import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInformeFinalComponent } from './detail-informe-final.component';

describe('DetailInformeFinalComponent', () => {
  let component: DetailInformeFinalComponent;
  let fixture: ComponentFixture<DetailInformeFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailInformeFinalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailInformeFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
