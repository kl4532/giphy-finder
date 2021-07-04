import { Component, OnInit } from '@angular/core';
import {GifsService} from "../../services/gifs.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private gifService: GifsService) { }

  ngOnInit(): void {
  }

  setOverviewState() {
    const overviewGifs = {
      allGifs: [],
      gifs: [],
      begin: 0,
      load: 0
    }
    this.gifService.setOverviewGifs(overviewGifs);
  }

}
