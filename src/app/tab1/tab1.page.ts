import { Component } from '@angular/core';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  photos:any[] = [];
    /*constructor(private photoLibrary: PhotoLibrary) {
        console.log('constructor with:'+photoLibrary);
    }*/
  constructor(private photoLibrary: PhotoLibrary) {
    this.photoLibrary.requestAuthorization().then(() => {
        this.photoLibrary.getLibrary().subscribe({
            next: library => {
                
                console.log('getLibrary:'+JSON.stringify(library));
                library.forEach(function(libraryItem) {
                    this.photos.push(libraryItem);
                        console.log(libraryItem.id);          // ID of the photo
                        console.log(libraryItem.photoURL);    // Cross-platform access to photo
                        console.log(libraryItem.thumbnailURL);// Cross-platform access to thumbnail
                        console.log(libraryItem.fileName);
                        console.log(libraryItem.width);
                        console.log(libraryItem.height);
                        console.log(libraryItem.creationDate);
                        console.log(libraryItem.latitude);
                        console.log(libraryItem.longitude);
                        console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
                });
            },
            error: err => { console.log('could not get photos'); },
            complete: () => { console.log('done getting photos'); }
        });
    })
    .catch(err => console.log('permissions weren\'t granted'));
  }
  
  

}
