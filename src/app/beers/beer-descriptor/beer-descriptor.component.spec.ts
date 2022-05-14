import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerDescriptorComponent } from './beer-descriptor.component';

describe('BeerDescriptorComponent', () => {
  let component: BeerDescriptorComponent;
  let fixture: ComponentFixture<BeerDescriptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerDescriptorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerDescriptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
