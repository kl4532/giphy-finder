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
          console.log('unfiltered', res);
          const gifs = []
          for (let el of res.data) {
            const gif = this.createGifObject(el);
            gifs.push(gif)
          }
          return gifs;
        }),
        tap(data => console.log('gifs from service', data)),
        catchError(this.handleError)
      );
  }

  getCategories() {
    return this.http.get(`${this.baseUrl}/gifs/categories?api_key=${this.apiKey}&limit=50&offset=0&rating=G&lang=en`)
  }

  getGifById(id: String): Observable<Gif> {
    console.log(id);
    return this.http.get(`${this.baseUrl}/gifs/${id}?api_key=${this.apiKey}`)
      .pipe(
        map((res: any) => {
          const el = res.data;
          return this.createGifObject(el);
        }),
        tap(data => console.log('gif from service', data)),
        catchError(this.handleError)
      );
  }

  getRandomGif(id: String) {
    return this.http.get(`${this.baseUrl}/gifs/random?api_key=${this.apiKey}`);
  }

  createGifObject(el: any): Gif {
    return {
      id: el.id,
      title: el.title,
      urlGiphy: el.images.original.mp4,
      urlPreview: el.images.preview_webp.url,
      urlDownsized: el.images.downsized.url,
      type: el.type,
      username: el.username,
      rating: el.rating,
      date: el.import_datetime
    }
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
