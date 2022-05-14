import { Component, OnInit } from '@angular/core';
import { BeersService } from '../beers.service';

@Component({
  selector: 'fresco-beers-list',
  templateUrl: './beers-list.component.html',
  styleUrls: ['./beers-list.component.scss']
})
export class BeersListComponent implements OnInit {

  readonly beers$ = this.beersService.getList();

  constructor(private beersService: BeersService) { }

  ngOnInit(): void {
  }

}
