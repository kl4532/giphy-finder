import {Component, Input, OnInit} from '@angular/core';
import {Gif} from "../../../shared/models/gif.model";

@Component({
  selector: 'app-gifs-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class GifsOverviewComponent implements OnInit {
  @Input() gifs: Gif[] = [];
  cols = 3;
  constructor() { }

  ngOnInit(): void {
    this.setColumns(window.innerWidth);
  }

  onResize(event: any) {
    this.setColumns(event.target.innerWidth )
  }

  setColumns(windowSize: Number) {
    switch (true) {
      case (windowSize <= 400):
        this.cols = 2;
        break;
      case (windowSize <= 700 && windowSize > 400):
        this.cols = 3;
        break;
      case (windowSize <= 1000 && windowSize > 700):
        this.cols = 4;
        break;
      case (windowSize <= 1200 && windowSize > 1000):
        this.cols = 5;
        break;
      case (windowSize > 1200):
        this.cols = 6;
        break;
      default:
        break;
    }
  }

}
