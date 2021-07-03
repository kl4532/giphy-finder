import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GifsService} from "../../../services/gifs.service";
import {Subscription} from "rxjs";
import {Gif} from "../../../shared/models/gif.model";
import {FavoritesService} from "../../../services/favorites.service";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-gif-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class GifComponent implements OnInit {
  sub: Subscription | undefined;
  gif: Gif | undefined;
  gifId: string | null | undefined;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private gifService: GifsService,
              private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.gifId = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.gifId) {
      this.sub = this.gifService.getGifById(this.gifId).subscribe((gif: Gif) => {
        this.gif = gif;
      });
    }
  }

  addToFavourites() {
    if(this.gif) {
      this.favoritesService.addToFavorites(this.gif);
    }
  }

  download() {
    if(this.gif) {
      this.favoritesService.downloadGif(this.gif).subscribe((blob: Blob) => {
        saveAs(blob, `${this.gif?.title}.gif`);
      });
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }


}
