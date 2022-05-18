import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { beersApiRoutes, beersParams } from './constants';
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
   * Get a beer by its id
   *
   * @param beerId
   *
   * @returns A beer
   */
  getOne(beerId: number | string): Observable<Beer> {
    return this.httpClient
      .get<BeerDTO[]>(`${this.apiRoute}/${beersApiRoutes.getOne.replace(beersParams.beerId, beerId.toString())}`)
      .pipe(
        map(beers => this.generateBeerFromDTO(beers[0]))
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
      ingredients: {
        malt: beerDTO.ingredients.malt.map(malt => ({
          id: this.generateId({ beerId: beerDTO.id, ...malt.amount, name: malt.name }),
          ...malt
        })),
        hops: beerDTO.ingredients.hops.map(hop => ({
          id: this.generateId({ beerId: beerDTO.id, ...hop.amount, name: hop.name, add: hop.add, attribute: hop.attribute }),
          ...hop
        })),
        yeast: beerDTO.ingredients.yeast
      }
    }
  }

  /**
   * Generate an ID based on an object
   *
   * @param obj Object that will be used to generate an ID
   *
   * @returns An ID
   */
  private generateId(obj: { [key: string]: string | number }): string {
    return Object
      .keys(obj)
      .filter(key => !!obj[key])
      .reduce((id, key) => `${id}_${obj[key].toString().toLowerCase().split(' ').join('')}`, '');
  }
}
