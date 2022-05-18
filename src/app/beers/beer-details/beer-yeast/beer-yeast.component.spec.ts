import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BeerYeastComponent } from './beer-yeast.component';

describe('BeerYeastComponent', () => {
  let component: BeerYeastComponent;
  let fixture: ComponentFixture<BeerYeastComponent>;

  const page = {
    get title(): HTMLTitleElement {
      return fixture.debugElement.query(By.css('#yeast-title')).nativeElement;
    },
    get info(): HTMLParagraphElement {
      return fixture.debugElement.query(By.css('#yeast-info')).nativeElement;
    },
  }
  const yeast = 'Some random text over here! Thanks for reading :p';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerYeastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerYeastComponent);
    component = fixture.componentInstance;

    component.yeast = yeast;

    fixture.detectChanges();
  });

  it('should show the yeast details', () => {
    expect(page.title.innerText).toBe('Yeast');
    expect(page.info.innerText).toBe(yeast);
  });
});
