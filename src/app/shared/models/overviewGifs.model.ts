import {Gif} from "./gif.model";

export interface OverviewGifs {
  gifs: Gif[];
  begin: number;
  load: number;
  cols: number;
  scrollTop: number;
}



