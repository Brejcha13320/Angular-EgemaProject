import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableJuradosComponent } from './table-jurados.component';

describe('TableJuradosComponent', () => {
  let component: TableJuradosComponent;
  let fixture: ComponentFixture<TableJuradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableJuradosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableJuradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
