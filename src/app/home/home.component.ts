import { Component } from '@angular/core';
import { AnatomyComponent } from '../anatomy/anatomy.component';
import { CreateBoardComponent } from '../create-board/create-board.component';
import { InfoBoardsComponent } from '../info-boards/info-boards.component';
import { IntroComponent } from '../intro/intro.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  template: `
    <app-navbar />
    <app-intro />
    <app-info-boards />
    <app-anatomy />
    <app-create-board />
  `,
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [NavbarComponent, IntroComponent, InfoBoardsComponent, CreateBoardComponent, AnatomyComponent]
})
export class HomeComponent { }
