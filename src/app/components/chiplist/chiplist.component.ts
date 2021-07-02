import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatChip, MatChipList } from '@angular/material/chips';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-chiplist',
  templateUrl: './chiplist.component.html',
  styleUrls: ['./chiplist.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ChiplistComponent,
      multi: true,
    },
  ],
})
export class ChiplistComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  // Not my work, component found here
  //https://github.com/thisiszoaib/multi-select-chips

  @ViewChild(MatChipList)
  chipList!: MatChipList;

  @Input() options: string[] = [];

  value: string[] = [];

  onChange!: (value: string[]) => void;
  onTouch: any;

  disabled = false;

  constructor() {}

  writeValue(value: string[]): void {
    // When form value set when chips list initialized
    if (this.chipList && value) {
      this.selectChips(value);
    } else if (value) {
      // When chips not initialized
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.selectChips(this.value);

    this.chipList.chipSelectionChanges
      .pipe(
        untilDestroyed(this),
        map((event) => event.source)
      )
      .subscribe((chip) => {
        if (chip.selected) {
          this.value = [...this.value, chip.value];
        } else {
          this.value = this.value.filter((o) => o !== chip.value);
        }

        this.propagateChange(this.value);
      });
  }

  propagateChange(value: string[]) {
    if (this.onChange) {
      this.onChange(value);
    }
  }

  selectChips(value: string[]) {
    this.chipList.chips.forEach((chip) => chip.deselect());

    const chipsToSelect = this.chipList.chips.filter((c) =>
      value.includes(c.value)
    );

    chipsToSelect.forEach((chip) => chip.select());
  }

  toggleSelection(chip: MatChip) {
    if (!this.disabled) chip.toggleSelected();
  }
}
