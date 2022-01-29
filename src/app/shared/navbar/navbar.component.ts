import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  visible!: boolean;

  //Data
  username!: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, public _authService: AuthService) { }

  ngOnInit(): void {
    //Determine if navbar should be displayed on the requested page - this is a flag passed from the router
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
      )
      .pipe(
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data),
      )
      .subscribe(event => {
        //this.viewedPage = event.title; // title of page
        this.showNavbar(event['navbar']); // show the toolbar?
      });
  }

  showNavbar(event: any) {
    if (event === false) {
      this.visible = false;
    } else if (event === true) {
      this.visible = true;
      //Get data for navbar
      this.username = this._authService.getUsername()!;

    } else {
      this.visible = this.visible;
    }
  }

}
