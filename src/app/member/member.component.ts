import {Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {TokenStorageService} from '../../services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  currentUser: any;
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1, image: '././assets/img/members1.png' },
          { title: 'Card 2', cols: 1, rows: 1, image: '././assets/img/events.jpg' },
          { title: 'Card 3', cols: 1, rows: 1, image: '././assets/img/publications.png' },
          { title: 'Card 4', cols: 1, rows: 1, image: '././assets/img/tools1.png' }
        ];
      }

      return [
        { title: 'Encadrement', cols: 1, rows: 1, image: '././assets/img/members1.png' },
        { title: 'Mes Evenements', cols: 1, rows: 1, image: '././assets/img/events.jpg' },
        { title: 'Mes Publications', cols: 1, rows: 1, image: '././assets/img/publications.png' },
        { title: 'Mes Outils', cols: 1, rows: 1, image: '././assets/img/tools1.png' }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private token: TokenStorageService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    const message = 'redirection successful';
    // @ts-ignore
    this.router.navigate(['./member']).then(console.log(message));


  }
}
