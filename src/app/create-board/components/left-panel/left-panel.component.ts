import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { COLLECTION_BOARDS } from '../../board';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftPanelComponent {

  public collectionsBoards = COLLECTION_BOARDS;

}
