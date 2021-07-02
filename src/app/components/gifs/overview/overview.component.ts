import {Component, Input, OnInit} from '@angular/core';
import {Gif} from "../../../shared/models/gif.model";

@Component({
  selector: 'app-gifs-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class GifsOverviewComponent implements OnInit {
  @Input() gifs: Gif[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
