import { Component, Input } from '@angular/core';

@Component({
  selector: 'fresco-beer-twist',
  templateUrl: './beer-twist.component.html',
  styleUrls: ['./beer-twist.component.scss']
})
export class BeerTwistComponent {
  @Input() twist!: string;
}
