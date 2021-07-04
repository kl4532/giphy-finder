import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GifsService} from "../../services/gifs.service";
import {Gif} from "../../shared/models/gif.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchForm: FormGroup | undefined;
  gifs: Gif[] = [];
  submitted = false;
  private sub: Subscription | undefined;

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      query: new FormControl('', Validators.required),
    });
  }

  submitForm() {
    this.sub = this.gifsService.getGifs(this.searchForm?.value.query).subscribe((gifs: any) => {
        this.gifs = gifs;
        this.submitted = true;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

}
