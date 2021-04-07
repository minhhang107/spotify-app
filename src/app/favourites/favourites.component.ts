import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  favourites = [] as any;
  constructor(private musicDataService: MusicDataService) {}

  removeFromFavourites(id: any) {
    this.musicDataService.removeFromFavourites(id).subscribe((data) => {
      this.favourites = data.tracks;
    });
  }

  ngOnInit(): void {
    this.musicDataService.getFavourites().subscribe((data) => {
      this.favourites = data.tracks;
    });
  }
}
