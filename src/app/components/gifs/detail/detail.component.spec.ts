import { ComponentFixture, TestBed } from '@angular/core/testing';
import {GifComponent} from "./detail.component";


describe('DetailComponent', () => {
  let component: GifComponent;
  let fixture: ComponentFixture<GifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
