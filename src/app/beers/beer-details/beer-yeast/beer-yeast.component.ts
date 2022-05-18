import { Component, Input } from '@angular/core';

@Component({
  selector: 'fresco-beer-yeast',
  templateUrl: './beer-yeast.component.html',
  styleUrls: ['./beer-yeast.component.scss']
})
export class BeerYeastComponent {
  @Input() yeast!: string;
}
