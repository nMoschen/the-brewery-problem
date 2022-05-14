import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { beersRoutes } from '../beers-routes';
import { BeersService } from '../beers.service';
import { beersParams } from '../constants';

@Component({
  selector: 'fresco-beers-list',
  templateUrl: './beers-list.component.html',
  styleUrls: ['./beers-list.component.scss']
})
export class BeersListComponent {

  readonly beers$ = this.beersService.getList();

  constructor(
    private beersService: BeersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  /**
   * Navigate to beer details
   */
  navigateToDetails(beerId: number): void {
    const path = beersRoutes.details.replace(beersParams.beerId, beerId.toString());
    this.router.navigate([path], { relativeTo: this.route });
  }

}
