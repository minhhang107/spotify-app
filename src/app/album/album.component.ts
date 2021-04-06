import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit {
  album = {} as any;
  paramSubscription: Subscription | undefined;

  @Output() iconClicked = new EventEmitter();

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private musicDataService: MusicDataService
  ) {}

  clickHandler(track: any) {
    this.addToFavourites(track.id);
  }

  addToFavourites(trackId: any) {
    this.musicDataService.addToFavourites(trackId).subscribe(
      (success) => {
        this.snackBar.open('Adding to Favourites...', 'Done', {
          duration: 1500,
        });
      },
      (err) => {
        this.snackBar.open('Unable to add song to Favourites', 'Done', {
          duration: 1500,
        });
      }
    );
  }
  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      this.musicDataService
        .getAlbumById(params.id)
        .subscribe((data) => (this.album = data));
    });
  }

  ngOnDestroy(): void {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }
}
