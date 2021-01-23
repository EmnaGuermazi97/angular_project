import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {TokenStorageService} from '../../services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  content: string;
  currentUser: any;
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
           { title: 'Card 1', cols: 1, rows: 1, image: '././assets/img/members1.png', path: '/members' },
          { title: 'Card 2', cols: 1, rows: 1, image: '././assets/img/events.jpg', path: '/events'  },
          { title: 'Card 3', cols: 1, rows: 1, image: '././assets/img/publications.jpg', path: '/publications' },
          { title: 'Card 4', cols: 1, rows: 1, image: '././assets/img/tools1.png', path: '/tools' }
        ];
      }

      return [
         { title: 'Tous les membres', cols: 1, rows: 1, image: '././assets/img/members1.png', path: '/members' },
        { title: 'Tous les Evenements', cols: 1, rows: 1, image: '././assets/img/events.jpg', path: '/events' },
        { title: 'Tous les Publications', cols: 1, rows: 1, image: '././assets/img/publications.jpg', path: '/publications' },
        { title: 'Tous les Outils', cols: 1, rows: 1, image: '././assets/img/tools1.png', path: '/tools' }
      ];
    })
  );
  constructor(private userService: UserService,
              private breakpointObserver: BreakpointObserver,
              private token: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    this.currentUser = this.token.getUser();
    const message = 'redirection successful to home';
    // @ts-ignore
    this.router.navigate(['./home']).then(console.log(message));
  }

}
