import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { WaveAnatomyComponent } from './components/wave-anatomy/wave-anatomy.component';
import { BoardAnatomyComponent } from './components/board-anatomy/board-anatomy.component';

@Component({
  selector: 'app-anatomy',
  standalone: true,
  imports: [
    CommonModule,
    WaveAnatomyComponent,
    BoardAnatomyComponent,
  ],
  templateUrl: './anatomy.component.html',
  styleUrls: ['./anatomy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnatomyComponent implements OnInit {

  ngOnInit(): void { }

}
