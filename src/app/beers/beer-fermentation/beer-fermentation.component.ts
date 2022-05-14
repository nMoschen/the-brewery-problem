import { Component, Input } from '@angular/core';
import { BeerFermentation } from '../models';

@Component({
  selector: 'fresco-beer-fermentation',
  templateUrl: './beer-fermentation.component.html',
  styleUrls: ['./beer-fermentation.component.scss']
})
export class BeerFermentationComponent {
  @Input() fermentation!: BeerFermentation;
}
