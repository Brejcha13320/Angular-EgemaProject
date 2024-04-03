import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePropuestasComponent } from './table-propuestas.component';

describe('TablePropuestasComponent', () => {
  let component: TablePropuestasComponent;
  let fixture: ComponentFixture<TablePropuestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablePropuestasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablePropuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
