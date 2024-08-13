import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInformesFinalesComponent } from './table-informes-finales.component';

describe('TableInformesFinalesComponent', () => {
  let component: TableInformesFinalesComponent;
  let fixture: ComponentFixture<TableInformesFinalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableInformesFinalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableInformesFinalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
