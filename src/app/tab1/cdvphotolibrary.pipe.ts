import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'cdvphotolibrary'})
export class CDVPhotoLibraryPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string) {


    /*let path = cordova.file.dataDirectory;
    console.log('Original: ' + path);

    path = normalizeURL(path);
    console.log('Fixed: ' + path);*/

    //let newurl = url.replace('cdvphotolibrary://','file://');
    return url.startsWith('cdvphotolibrary://') ? this.sanitizer.bypassSecurityTrustUrl(url) : url;

    //return newurl.startsWith('file://') ? this.sanitizer.bypassSecurityTrustUrl(url) : url;

  }
}
