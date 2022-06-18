import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  private url = 'https://newsapi.org/v2/top-headlines';
  private pageSize = 10;
  private apiKey = '1228698dc44247d995eff52ac11b76fc';
  private country = 'us';

  pagesInput: Subject<number>;
  pagesOutput: Observable<any>;
  // numberOfPages: Observable<number>;

  constructor() {
    this.pagesInput = new Subject();
    this.pagesOutput = this.pagesInput.pipe();
  }
}
