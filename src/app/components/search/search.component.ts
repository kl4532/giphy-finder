import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  mockChips = ['angular', 'how-to', 'how-not-to', 'tutorial', 'test very long chip'];
  searchForm: FormGroup | undefined;

  constructor() { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      query: new FormControl('', Validators.required),
      chips: new FormControl('', Validators.required),
    });
  }

  submitForm() {
    console.log(this.searchForm?.value);
  }

}
