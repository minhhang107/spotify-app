import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  favourites = [] as any;
  loading: boolean = true;
  constructor(private musicDataService: MusicDataService) {}

  removeFromFavourites(id: any) {
    this.musicDataService.removeFromFavourites(id).subscribe((data) => {
      this.favourites = data.tracks;
    });
  }

  ngOnInit(): void {
    this.musicDataService.getFavourites().subscribe((data) => {
      this.favourites = data.tracks;
      this.loading = false;
    });
  }
}
