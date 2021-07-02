import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {Gif} from "../shared/models/gif.model";
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http: HttpClient,
              @Inject('API_KEY') private apiKey: string,
              @Inject('API_BASE_URL') private baseUrl: string) { }

  getGifs(query: String): Observable<Gif[]>{
    return this.http.get(`${this.baseUrl}/gifs/search?api_key=${this.apiKey}&q=${query}&tag=science&limit=50&offset=0&rating=G&lang=en`)
      .pipe(
        map((res: any) => {
          const gifs = []
          for (let el of res.data) {
            const gif = {
              id: el.id,
              title: el.title,
              url: el.url,
              bitly_gif_url: el.bitly_gif_url,
              bitly_url: el.url,
              import_datetime: el.import_datetime,
              type: el.type,
              username: el.username,
              rating: el.rating
            }
            gifs.push(gif)
          }
          return gifs;
        }),
        tap(data => console.log('gifs from service', data)),
        catchError(this.handleError)
      );
  }

  getCategories() {
    return this.http.get(`${this.baseUrl}/gifs/categories?api_key=${this.apiKey}&limit=50&offset=0&rating=G&lang=en`);
  }

  getGifById(id: String) {
    return this.http.get(`${this.baseUrl}/gifs/${id}?api_key=${this.apiKey}`);
  }

  getRandomGif(id: String) {
    return this.http.get(`${this.baseUrl}/gifs/random?api_key=${this.apiKey}`);
  }

  private handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }


}
