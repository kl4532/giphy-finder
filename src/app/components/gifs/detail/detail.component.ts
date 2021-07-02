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

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private gifService: GifsService) { }

  ngOnInit(): void {
    const gifId = this.activatedRoute.snapshot.paramMap.get('id');
    if(gifId) {
      this.sub = this.gifService.getGifById(gifId).subscribe((gif: Gif) => {
        this.gif = gif;
      });
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
