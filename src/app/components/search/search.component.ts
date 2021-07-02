import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GifsService} from "../../services/gifs.service";
import {Gif} from "../../shared/models/gif.model";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  mockChips = ['angular', 'how-to', 'how-not-to', 'tutorial', 'test very long chip'];
  searchForm: FormGroup | undefined;
  gifs: Gif[] = [];

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      query: new FormControl('', Validators.required),
      // chips: new FormControl('', Validators.required),
      // I want more filters!
    });
  }

  getCategories() {
    const chips = this.searchForm?.value.chips
    this.gifsService.getCategories().subscribe(res => console.log(res));
  }

  submitForm() {
    this.gifsService.getGifs(this.searchForm?.value.query).subscribe((gifs: any) => {
        this.gifs = gifs;
        console.log(gifs);
    });
    console.log(this.searchForm?.value);
  }

}
