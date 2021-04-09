import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  results: any;
  searchQuery: any;
  loading: boolean = true;
  paramSubscription!: Subscription;

  filterArtists(array: any) {
    return array.filter((artist: any) => {
      artist.images.length > 0;
    });
  }

  constructor(
    private route: ActivatedRoute,
    private musicDataService: MusicDataService
  ) {}

  ngOnInit(): void {
    this.paramSubscription = this.route.queryParams.subscribe((params) => {
      this.searchQuery = params.q;

      this.musicDataService
        .searchArtists(this.searchQuery)
        .subscribe((data) => {
          this.results = data.artists.items.filter(
            (artist: any) => artist.images.length > 0
          );
          this.loading = false;
        });
    });
  }
}
