import { Component, Input } from '@angular/core';

@Component({
  selector: 'fresco-beer-descriptor',
  templateUrl: './beer-descriptor.component.html',
  styleUrls: ['./beer-descriptor.component.scss']
})
export class BeerDescriptorComponent {
  @Input() name!: string;
  @Input() value!: number;
  @Input() style!: 'small' | 'big';
}
