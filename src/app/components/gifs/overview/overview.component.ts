import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {Gif} from "../../../shared/models/gif.model";
import {fromEvent, Subscription} from "rxjs";
import {GifsService} from "../../../services/gifs.service";
import {IMasonryGalleryImage} from "ngx-masonry-gallery";
import {Router} from "@angular/router";

@Component({
  selector: 'app-gifs-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class GifsOverviewComponent implements OnDestroy, OnInit {

  @Input() gifs: Gif[] = [];
  @Input() formSubmitted = false;
  displayedGifs: Gif[] = [];
  loadInit = 10;
  begin = 0;
  load = this.loadInit;
  sub: Subscription | undefined;
  windowWidth: number;

  constructor(private el: ElementRef,
              private gifService: GifsService,
              private router: Router) {
    this.windowWidth = window.innerWidth;
    console.log(this.windowWidth)
    const body = document.body;
    this.sub = fromEvent(body, "scroll").subscribe(() => {
      if(( body.offsetHeight + body.scrollTop) >=  body.scrollHeight-1) {
        this.loadMoreGifs();
      }
    });
  }
  public get dg(): IMasonryGalleryImage[] {
    return this.displayedGifs.map((m: Gif) => <IMasonryGalleryImage>{
      imageUrl: m.urlPreview,
      alt: m.id
    });
  }

  ngOnInit() {
    const overviewGifs = this.gifService.getOverviewGifs();
    if(overviewGifs) {
      this.gifs = overviewGifs.allGifs;
      this.displayedGifs = overviewGifs.gifs;
      this.begin = overviewGifs.begin;
      this.load = overviewGifs.load;
    }
  }

  // to limit displayed gifs
  loadMoreGifs() {
    let part;
    if(this.begin > this.gifs.length)
      return;

    if(this.loadInit > this.gifs.length - this.begin) {
      part = this.gifs.slice(this.displayedGifs.length, this.gifs.length);
    } else {
      part = this.gifs.slice(this.displayedGifs.length, this.load);
    }

    this.displayedGifs = this.displayedGifs.concat(part);
    this.begin = this.begin + this.loadInit + 1;
    this.load = this.begin + this.loadInit;

    this.setOverviewState();
  }

  setOverviewState() {
    const overviewGifs = {
      allGifs: this.gifs,
      gifs: this.displayedGifs,
      begin: this.begin,
      load: this.load,
    }
    this.gifService.setOverviewGifs(overviewGifs);
  }

  gifClick(event: any) {
    this.router.navigate(['/gif', event.alt]);

  }

  getGifsFromSearch(gifs: Gif[]) {
    this.gifs = gifs;
    if(this.gifs.length > 0) {
      this.displayedGifs = [];
      this.begin = 0;
      this.load = this.loadInit;
      this.loadMoreGifs();
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
