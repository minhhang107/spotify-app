import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MusicDataService } from '../music-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit {
  albums = [] as any;
  artist = {} as any;
  loading: boolean = true;
  paramSubscription = {} as Subscription;

  constructor(
    private route: ActivatedRoute,
    private musicDataService: MusicDataService
  ) {}

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      this.musicDataService.getArtistById(params.id).subscribe((data) => {
        this.artist = data;
        this.loading = false;
      });

      this.musicDataService
        .getAlbumsByArtistId(params.id)
        .subscribe((albumData) => {
          this.albums = albumData.items.filter((item: any, index: any) => {
            return (
              albumData.items
                .map((item: any) => item.name)
                .indexOf(item.name) === index
            );
          });
        });
    });
  }
}
