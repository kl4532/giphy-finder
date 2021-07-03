import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Gif} from "../shared/models/gif.model";
import {BehaviorSubject, Observable, of} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  changesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient,
              @Inject('API_KEY') private apiKey: string,
              @Inject('API_BASE_URL') private baseUrl: string) { }

  addToFavorites(gif: Gif) {
    let gifs = this.getLs();
    gifs.push(gif);
    localStorage.setItem("gifs", JSON.stringify(gifs));
  }

  getFromFavorites(): Gif[] {
    return this.getLs();
  }

  removeFromFavorites(id: string) {
    let gifs = this.getLs();
    gifs = gifs.filter((gif: Gif) => gif.id !== id);
    localStorage.setItem("gifs", JSON.stringify(gifs));
    this.changesSubject.next(null);
  }

  isFavorite(id: string): Observable<boolean> {
    const found = this.getLs().find((gif: Gif) => gif.id === id);
    if(found) {
      return of(true);
    }
    return of(false);
  }

  getLs(): Gif[] {
    let gifs: Gif[] = [];
    const gifsFromLs = localStorage.getItem('gifs') || '';
    if(gifsFromLs) {
      gifs = JSON.parse(gifsFromLs);
    }
    return gifs;
  }

  downloadGif(gif: Gif): Observable<Blob> {
    return this.http.get(gif.urlDownsized, {responseType: 'blob'}).pipe(map((blob: Blob) => blob));
  }

}
