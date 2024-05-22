import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <div class="main">
      <router-outlet #outlet="outlet"></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent {
  title = 'catch-a-wave';
}
