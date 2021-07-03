import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FavoritesService} from "../../services/favorites.service";
import {Gif} from "../../shared/models/gif.model";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  gifs: Gif[] | undefined;

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.favoritesService.changesSubject.subscribe(()=> this.gifs = this.favoritesService.getFromFavorites());
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

  share() {

  }
}
