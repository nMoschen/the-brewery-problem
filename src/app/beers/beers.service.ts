import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { beersApiRoutes } from './constants';
import { Beer, BeerDTO } from './models';

@Injectable({
  providedIn: 'root'
})
export class BeersService {

  private readonly apiRoute = `${environment.apis.punk.base}/${beersApiRoutes.base}`;

  constructor(private httpClient: HttpClient) { }

  /**
   * Get the list of beers
   *
   * @returns A list of beers
   */
  getList(): Observable<Beer[]> {
    return this.httpClient
      .get<BeerDTO[]>(`${this.apiRoute}/${beersApiRoutes.list}`)
      .pipe(
        map(response => response.map(beer => this.generateBeerFromDTO(beer)))
      );
  }

  /**
   * Generate a beer from a beer DTO
   *
   * @param beerDTO
   *
   * @returns A beer
   */
  private generateBeerFromDTO(beerDTO: BeerDTO): Beer {
    return {
      id: beerDTO.id,
      name: beerDTO.name,
      description: beerDTO.description,
      imageUrl: beerDTO.image_url,
      abv: beerDTO.abv,
      ibu: beerDTO.ibu,
      ebc: beerDTO.ebc,
      srm: beerDTO.srm,
      method: {
        mashing: beerDTO.method.mash_temp,
        fermentation: beerDTO.method.fermentation,
        twist: beerDTO.method.twist,
      },
      ingredients: beerDTO.ingredients
    }
  }
}
