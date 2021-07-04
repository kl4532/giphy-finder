import {Component, OnDestroy, OnInit} from '@angular/core';
import {FavoritesService} from "../../services/favorites.service";
import {Gif} from "../../shared/models/gif.model";
import {saveAs} from "file-saver";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit, OnDestroy {
  gifs: Gif[] | undefined;
  sub: Subscription | undefined;
  subDownload: Subscription | undefined;

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.sub = this.favoritesService.changesSubject.subscribe(()=> this.gifs = this.favoritesService.getFromFavorites());
  }

  removeFromFavorites(id: string) {
    this.favoritesService.removeFromFavorites(id);
  }

  download(id: string) {
      const gif = this.gifs?.find(gif => gif.id === id);
      if(gif) {
        this.favoritesService.downloadGif(gif).subscribe((blob: Blob) => {
          saveAs(blob, `${gif.title}.gif`);
        });
      }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.subDownload?.unsubscribe();
  }
}
