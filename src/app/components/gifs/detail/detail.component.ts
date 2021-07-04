import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GifsService} from "../../../services/gifs.service";
import {Subscription} from "rxjs";
import {Gif} from "../../../shared/models/gif.model";
import {FavoritesService} from "../../../services/favorites.service";
import {saveAs} from "file-saver";
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-gif-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class GifComponent implements OnInit, OnDestroy {
  sub: Subscription | undefined;
  subDownload: Subscription | undefined;
  gif: Gif | undefined;
  gifId: string | null | undefined;
  icons = {faTwitter, faFacebook,};

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private gifService: GifsService,
              public favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.gifId = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.gifId) {
      this.sub = this.gifService.getGifById(this.gifId).subscribe((gif: Gif) => {
        this.gif = gif;
      });
    }
  }

  download() {
    if(this.gif) {
      this.subDownload = this.favoritesService.downloadGif(this.gif).subscribe((blob: Blob) => {
        saveAs(blob, `${this.gif?.title}.gif`);
      });
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.subDownload?.unsubscribe();
  }


}
