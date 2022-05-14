import { Component, Input } from '@angular/core';
import { BeerMashing } from '../models';

@Component({
  selector: 'fresco-beer-mashing',
  templateUrl: './beer-mashing.component.html',
  styleUrls: ['./beer-mashing.component.scss']
})
export class BeerMashingComponent {
  @Input() mashing!: BeerMashing[];
}
