import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BeerFermentationMocker } from '../../testing';
import { BeerFermentationComponent } from './beer-fermentation.component';

describe('BeerFermentationComponent', () => {
  let component: BeerFermentationComponent;
  let fixture: ComponentFixture<BeerFermentationComponent>;

  const page = {
    get title(): HTMLTitleElement {
      return fixture.debugElement.query(By.css('#fermentation-title')).nativeElement;
    },
    get fermentation(): HTMLDivElement {
      return fixture.debugElement.query(By.css('#fermentation-temperature')).nativeElement;
    },
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerFermentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerFermentationComponent);
    component = fixture.componentInstance;
  });

  it('should show the fermentation details', () => {
    const fermentation = BeerFermentationMocker.generateOne();
    component.fermentation = fermentation;
    fixture.detectChanges();

    expect(page.title.innerText).toBe('Fermentation');
    expect(page.fermentation.innerText).toBe(`${fermentation.temp.value}° ${fermentation.temp.unit}`);
  });
});
