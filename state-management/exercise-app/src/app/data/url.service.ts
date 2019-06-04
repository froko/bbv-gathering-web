import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private goodUrl = 'api/heroes';
  private badUrl = 'api/oops';

  private urlValid = true;
  private actualUrl = this.goodUrl;

  get isUrlValid() {
    return this.urlValid;
  }

  get url() {
    return this.actualUrl;
  }

  toggleUrl() {
    this.urlValid = !this.urlValid;
    this.actualUrl = this.urlValid ? this.goodUrl : this.badUrl;

    console.log(this.actualUrl);
    return this.actualUrl;
  }
}
