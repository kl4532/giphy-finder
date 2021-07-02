import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GifsOverviewComponent } from './overview.component';

describe('GifsOverviewComponent', () => {
  let component: GifsOverviewComponent;
  let fixture: ComponentFixture<GifsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GifsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GifsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
