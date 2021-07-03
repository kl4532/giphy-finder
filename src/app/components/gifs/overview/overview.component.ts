import {Component, ElementRef, HostListener, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Gif} from "../../../shared/models/gif.model";
import {fromEvent, Subscription} from "rxjs";

@Component({
  selector: 'app-gifs-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class GifsOverviewComponent implements OnChanges, OnDestroy {
  @Input() gifs: Gif[] = [];
  @Input() formSubmitted = false;
  displayedGifs: Gif[] = [];
  loadInit = 10;
  begin = 0;
  load = this.loadInit;
  cols = 3;
  sub: Subscription | undefined;

  constructor(private el: ElementRef) {
    // it took me a while(3h) to figure out why listening to scroll event is not working on this component
    // it's because scroll event is triggered on body here, that's why I couldn't use popular
    // ngx-infinite-scroll lib, or rather I don't know how to utilize it here... yet :)
    const elem = document.body;
    const sub = fromEvent(document.body, "scroll").subscribe(() => {
      if(( elem.offsetHeight + elem.scrollTop) >=  elem.scrollHeight) {
        this.loadMoreGifs();
      }
    });
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
    this.setColumns(event.target.innerWidth )
  }

  setColumns(windowSize: Number) {
    switch (true) {
      case (windowSize <= 400):
        this.cols = 1;
        break;
      case (windowSize <= 700 && windowSize > 400):
        this.cols = 2;
        break;
      case (windowSize <= 1000 && windowSize > 700):
        this.cols = 2;
        break;
      case (windowSize <= 1200 && windowSize > 1000):
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
    if(this.load > this.gifs.length - this.begin) {
      part = this.gifs.slice(this.begin, this.gifs.length-1);
    } else {
      part = this.gifs.slice(this.begin, this.load);
    }
    this.displayedGifs = this.displayedGifs.concat(part);
    this.begin = this.begin + this.load + 1;
    this.load = this.begin + this.load;
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
