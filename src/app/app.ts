import { Component, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TopbarComponent } from "./shared/components/topbar/topbar.component";
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('PriceTrackr');
  pageTitle = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      mergeMap(route => route.data)
    ).subscribe(data => {
      this.pageTitle = data['title'] || '';
    });
  }
}
