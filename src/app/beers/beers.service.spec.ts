import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BeersService } from './beers.service';
import { environment } from 'src/environments/environment';
import { beersApiRoutes, beersParams } from './constants';
import { apiBeers } from './testing';
import { Beer, BeerDTO } from './models';

describe('BeersService', () => {
  let beersService: BeersService;
  let httpTestingController: HttpTestingController;

  const apiRoute = `${environment.apis.punk.base}/${beersApiRoutes.base}`;

  const assertBeer = (beer: Beer, beerDTO: BeerDTO) => {
    expect(beer).toEqual({
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
          id: jasmine.any(String),
          ...malt
        })),
        hops: beerDTO.ingredients.hops.map(hop => ({
          id: jasmine.any(String),
          ...hop
        })),
        yeast: beerDTO.ingredients.yeast
      }
    });
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    beersService = TestBed.inject(BeersService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterAll(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(beersService).toBeTruthy();
  });

  it('should get a list of beers', (done: DoneFn) => {
    beersService
      .getList()
      .subscribe(beers => {
        beers.forEach((beer, i) => assertBeer(beer, apiBeers[i] as BeerDTO));
        done();
      });

    const url = `${apiRoute}/${beersApiRoutes.list}`;
    const request = httpTestingController.expectOne(req => req.method === 'GET' && req.url === url);
    request.flush(apiBeers, { status: 200, statusText: 'OK' });
  });

  it('should get a beers', (done: DoneFn) => {
    const apiBeer = apiBeers[2];
    beersService
      .getOne(apiBeer.id)
      .subscribe(beer => {
        assertBeer(beer, apiBeer as BeerDTO);
        done();
      });

    const url = `${apiRoute}/${beersApiRoutes.getOne.replace(beersParams.beerId, apiBeer.id.toString())}`;
    const request = httpTestingController.expectOne(req => req.method === 'GET' && req.url === url);
    request.flush([apiBeer], { status: 200, statusText: 'OK' });
  });
});
