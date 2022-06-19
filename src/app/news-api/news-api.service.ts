import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, pluck, Subject, switchMap, tap } from 'rxjs';

export interface Article {
  title: string;
  url: string;
}

interface NewsApiResponse {
  totalResults: number;
  articles: Article[];
}

@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  private url = 'https://newsapi.org/v2/top-headlines';
  private pageSize = 10;
  private apiKey = '1228698dc44247d995eff52ac11b76fc';
  private country = 'us';

  private pagesInput: Subject<number>;
  pagesOutput: Observable<Article[]>;
  numberOfPages: Subject<number>;

  constructor(private http: HttpClient) {
    this.numberOfPages = new Subject();
    this.pagesInput = new Subject();
    this.pagesOutput = this.pagesInput.pipe(
      map((page) => {
        return new HttpParams()
          .set('apiKey', this.apiKey)
          .set('country', this.country)
          .set('pageSize', this.pageSize)
          .set('page', page);
      }),
      switchMap((params) => {
        return this.http.get<NewsApiResponse>(this.url, { params });
      }),
      tap((response) => {
        const totalPages = Math.ceil(response.totalResults / this.pageSize);
        this.numberOfPages.next(totalPages);
      }),
      pluck('articles')
    );
  }

  getPage(page: number) {
    this.pagesInput.next(page);
  }
}
