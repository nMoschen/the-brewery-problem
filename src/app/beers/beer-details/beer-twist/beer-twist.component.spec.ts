import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BeerTwistComponent } from './beer-twist.component';

describe('BeerTwistComponent', () => {
  let component: BeerTwistComponent;
  let fixture: ComponentFixture<BeerTwistComponent>;

  const page = {
    get title(): HTMLTitleElement {
      return fixture.debugElement.query(By.css('#twist-title')).nativeElement;
    },
    get info(): HTMLParagraphElement {
      return fixture.debugElement.query(By.css('#twist-info')).nativeElement;
    },
  }
  const twist = 'Some random text over here! Thanks for reading :p';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerTwistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerTwistComponent);
    component = fixture.componentInstance;

    component.twist = twist;

    fixture.detectChanges();
  });

  it('should show the twist details', () => {
    expect(page.title.innerText).toBe('Twist');
    expect(page.info.innerText).toBe(twist);
  });
});
