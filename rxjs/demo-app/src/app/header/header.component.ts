import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UrlService } from '@demo-app/data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router, private urlService: UrlService) {}

  goToHomePage() {
    this.router.navigate(['home']);
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }

  toggleUrl() {
    this.urlService.toggleUrl();
  }
}
