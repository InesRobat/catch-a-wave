import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';
import { RightPanelComponent } from './components/right-panel/right-panel.component';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    LeftPanelComponent,
    RightPanelComponent,
  ],
})
export class CreateBoardComponent { }

