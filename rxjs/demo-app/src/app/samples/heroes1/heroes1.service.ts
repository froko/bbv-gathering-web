import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HeroResource, UrlService } from '@demo-app/data';

@Injectable({
  providedIn: 'root'
})
export class Heroes1Service {
  constructor(private http: HttpClient, private urlService: UrlService) {}

  getHeroes(): Observable<HeroResource> {
    return this.http.get<HeroResource>(this.urlService.url);
  }
}
