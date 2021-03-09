import { Component,OnInit,AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { PhotoLibrary, LibraryItem } from '@ionic-native/photo-library/ngx';
import { File } from '@ionic-native/file/ngx';
import {of} from 'rxjs';

declare var cordova;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements AfterViewInit,OnInit {
  photos:LibraryItem[];
  test:string[] = ['a','b','c'];



    /*constructor(private photoLibrary: PhotoLibrary) {
        console.log('constructor with:'+photoLibrary);
    }*/
  constructor(private photoLibrary:PhotoLibrary, private cd:ChangeDetectorRef) {
    this.photos = [];
    this.photoLibrary.requestAuthorization().then(() => {
      this.photoLibrary.getLibrary().subscribe({
        next: library => {
          var that = this;
          var lib = library["library"];
          var i=0;
          lib.forEach(function(libraryItem) {
              that.photos.push(libraryItem);
              console.log('url img:'+libraryItem.thumbnailURL);
              that.testFileCDV(that.photos[i].thumbnailURL,'image-'+i);
              i++;

          });


        /*
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
          });*/
        },
        error: err => { console.log('could not get photos'); },
        complete: () => { console.log('done getting photos'); }
      });
    })
    .catch(err => console.log('permissions weren\'t granted'));



  }
  ngAfterViewInit() {
      console.log('ngAfterViewInit');



  }
  ngOnInit(){
      console.log('ngOnInit');


  }

  testFileCDV(filename,elementId){
    //https://cordova.apache.org/docs/en/9.x/reference/cordova-plugin-file/#cdvfile-protocol
    cordova.resolveLocalFileSystemURL(filename, function(entry) {
        var nativePath = entry.toURL();
        console.log('Native URI: ' + nativePath);
        (<HTMLImageElement>document.getElementById(elementId)).src = nativePath;
    });
  }







}
