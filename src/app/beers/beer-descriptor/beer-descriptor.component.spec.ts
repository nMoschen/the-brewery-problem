import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BeerDescriptorComponent } from './beer-descriptor.component';

describe('BeerDescriptorComponent', () => {
  let component: BeerDescriptorComponent;
  let fixture: ComponentFixture<BeerDescriptorComponent>;

  const page = {
    get name(): HTMLSpanElement {
      return fixture.debugElement.query(By.css('#descriptor-name')).nativeElement;
    },
    get value(): HTMLSpanElement {
      return fixture.debugElement.query(By.css('#descriptor-value')).nativeElement;
    }
  }
  const name = 'Some name';
  const value = 12;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerDescriptorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerDescriptorComponent);
    component = fixture.componentInstance;

    component.name = name;
    component.value = value;
  });

  it('should name and value', () => {
    fixture.detectChanges();

    expect(page.name.innerText).toBe(name);
    expect(page.value.innerText).toBe(`${value}`);
  });

  it('should set a class for the "small" style', () => {
    component.style ='small';

    fixture.detectChanges();

    expect(page.name.classList).toContain('descriptor-name--small');
    expect(page.value.classList).toContain('descriptor-value--small');
  });

  it('should set a class for the "big" style', () => {
    component.style ='big';

    fixture.detectChanges();

    expect(page.name.classList).toContain('descriptor-name--big');
    expect(page.value.classList).toContain('descriptor-value--big');
  });
});
