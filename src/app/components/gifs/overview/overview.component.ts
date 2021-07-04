import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit
} from '@angular/core';
import {Gif} from "../../../shared/models/gif.model";
import {fromEvent, Subscription} from "rxjs";
import {GifsService} from "../../../services/gifs.service";

@Component({
  selector: 'app-gifs-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class GifsOverviewComponent implements OnChanges, OnDestroy, OnInit {
  @Input() gifs: Gif[] = [];
  @Input() formSubmitted = false;
  displayedGifs: Gif[] = [];
  loadInit = 10;
  begin = 0;
  load = this.loadInit;
  cols = 3;
  sub: Subscription | undefined;
  bodyElement: HTMLElement;

  constructor(private el: ElementRef,
              private gifService: GifsService) {
    // it took me a while(3h) to figure out why listening to scroll event is not working on this component
    // it's because scroll event is triggered on body here, that's why I couldn't use popular
    // ngx-infinite-scroll lib, or rather I don't know how to utilize it here... yet :)
    this.bodyElement = document.body
    const sub = fromEvent(this.bodyElement, "scroll").subscribe(() => {
      if(( this.bodyElement.offsetHeight + this.bodyElement.scrollTop) >=  this.bodyElement.scrollHeight) {
        this.loadMoreGifs();
      }
    });
  }

  ngOnInit() {
    const overviewGifs = this.gifService.getOverviewGifs();
    if(overviewGifs) {
      this.displayedGifs = overviewGifs.gifs;
      this.begin = overviewGifs.begin;
      this.load = overviewGifs.load;
      this.cols = overviewGifs.cols;
      setTimeout(() => this.bodyElement.scrollTo(0, overviewGifs.scrollTop),10);
    }
  }

  ngOnChanges() {
    if(this.gifs.length > 0) {
      this.displayedGifs = [];
      this.begin = 0;
      this.load = this.loadInit;
      this.loadMoreGifs();
      this.setColumns(window.innerWidth);
    }
  }

  onResize(event: any) {
    this.setColumns(event.target.innerWidth);
  }

  setColumns(windowSize: Number) {
    switch (true) {
      case (windowSize <= 500):
        this.cols = 1;
        break;
      case (windowSize <= 700 && windowSize > 500):
        this.cols = 2;
        break;
      case (windowSize <= 1000 && windowSize > 700):
        this.cols = 3;
        break;
      case (windowSize > 1200):
        this.cols = 4;
        break;
      default:
        break;
    }
  }
  // to limit displayed gifs
  loadMoreGifs() {
    let part;
    if(this.begin > this.gifs.length)
      return;

    if(this.loadInit > this.gifs.length - this.begin) {
      part = this.gifs.slice(this.displayedGifs.length, this.gifs.length);
      // console.log('last part', part);
    } else {
      part = this.gifs.slice(this.displayedGifs.length, this.load);
    }

    this.displayedGifs = this.displayedGifs.concat(part);
    this.begin = this.begin + this.loadInit + 1;
    this.load = this.begin + this.loadInit;
  }

  setOverviewState() {
    const overviewGifs = {
      gifs: this.displayedGifs,
      begin: this.begin,
      load: this.load,
      cols: this.cols,
      scrollTop: this.bodyElement.scrollTop
    }
    this.gifService.setOverviewGifs(overviewGifs);
  }

  ngOnDestroy() {
    this.setOverviewState()
    this.sub?.unsubscribe();
  }
}
