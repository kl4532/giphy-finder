import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GifsService} from "../../../services/gifs.service";
import {Subscription} from "rxjs";
import {Gif} from "../../../shared/models/gif.model";

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
              private gifService: GifsService) { }

  ngOnInit(): void {
    this.gifId = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.gifId) {
      this.sub = this.gifService.getGifById(this.gifId).subscribe((gif: Gif) => {
        this.gif = gif;
      });
    }
  }

  addToFavourites() {
    console.log(this.gifId);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }


}
