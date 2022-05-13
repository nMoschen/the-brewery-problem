import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeersListItemComponent } from './beers-list-item.component';

describe('BeersListItemComponent', () => {
  let component: BeersListItemComponent;
  let fixture: ComponentFixture<BeersListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeersListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeersListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
