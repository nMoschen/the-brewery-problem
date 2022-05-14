import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BeersService } from '../beers.service';
import { beersParams } from '../constants';
import { Beer } from '../models';

@Component({
  selector: 'fresco-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.scss']
})
export class BeerDetailsComponent implements OnInit {

  beer$: Observable<Beer> | undefined;

  constructor(private beersService: BeersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBeerDetails();
  }

  /**
   * Get beer details
   */
  private getBeerDetails(): void {
    const beerId = this.route.snapshot.paramMap.get(beersParams.beerId) as string;
    this.beer$ = this.beersService.getOne(beerId);
  }
}
