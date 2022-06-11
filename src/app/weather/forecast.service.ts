import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  filter,
  map,
  mergeMap,
  Observable,
  of,
  pluck,
  share,
  switchMap,
  toArray,
} from 'rxjs';

interface OpenWeatherResponse {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    };
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  private url = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) {}

  getForecast() {
    return this.getCurrentLocation().pipe(
      map((coords) => {
        return new HttpParams()
          .set('lat', coords.latitude)
          .set('lon', coords.longitude)
          .set('units', 'metric')
          .set('appid', 'f557b20727184231a597c710c8be3106');
      }),
      switchMap((params) =>
        this.http.get<OpenWeatherResponse>(this.url, { params })
      ),
      pluck('list'),
      mergeMap((value) => of(...value)),
      filter((_, index) => index % 8 === 0),
      map((value) => ({
        dateString: value.dt_txt,
        temp: value.main.temp,
      })),
      toArray(),
      share()
    );
  }

  getCurrentLocation() {
    return new Observable<GeolocationCoordinates>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => observer.error(err)
      );
    });
  }
}
