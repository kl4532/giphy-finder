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
  submitted = false;

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      query: new FormControl('', Validators.required),
    });
  }

  submitForm() {
    this.gifsService.getGifs(this.searchForm?.value.query).subscribe((gifs: any) => {
        this.gifs = gifs;
        this.submitted = true;
    });
    console.log(this.searchForm?.value);
  }

}
