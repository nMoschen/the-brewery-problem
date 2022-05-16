import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BeerMashingMocker } from '../../testing';
import { BeerMashingComponent } from './beer-mashing.component';

describe('BeerMashingComponent', () => {
  let component: BeerMashingComponent;
  let fixture: ComponentFixture<BeerMashingComponent>;

  const page = {
    get title(): HTMLTitleElement {
      return fixture.debugElement.query(By.css('#mashing-title')).nativeElement;
    },
    get infos(): DebugElement[] {
      return fixture.debugElement.queryAll(By.css('.mashing-info'));
    },
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerMashingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerMashingComponent);
    component = fixture.componentInstance;
  });

  it('should show the mashing details', () => {
    const mashing = BeerMashingMocker.generateList(4);
    component.mashing = mashing;
    fixture.detectChanges();

    expect(page.title.innerText).toBe('Mashing');
    page.infos.forEach((element, index) => {
      expect(element.nativeElement.innerText).toBe(`${mashing[index].temp.value}° ${mashing[index].temp.unit} (${mashing[index].duration} min)`);
    });
  });
});
