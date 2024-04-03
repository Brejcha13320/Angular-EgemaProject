import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEmailComponent } from './item-email.component';

describe('ItemEmailComponent', () => {
  let component: ItemEmailComponent;
  let fixture: ComponentFixture<ItemEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
