import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-boards',
  templateUrl: './info-boards.component.html',
  styleUrls: ['./info-boards.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class InfoBoardsComponent implements OnInit {

  public boards = [
    {
      'title': 'Longboard',
      'image': './assets/images/longboard.png',
      'shape': 'from 9 to 12 feet',
      'description': 'Longboards provide a stable and smooth ride in the waves. They are characterized by their rounded noses, wide and flat decks, and rounded tails.',
    },
    {
      'title': 'Malibu',
      'image': './assets/images/funboard.png',
      'shape': 'from 7 to 8 feet',
      'description': 'A Malibu, also known as a funboard in the world of surfing, it\'s designed to provide a balance between stability and maneuverability to perform turns and tricks.',
    },
    {
      'title': 'Fish',
      'image': './assets/images/fish.png',
      'shape': 'more playful and skatey style',
      'description': 'Fish boards typically have a wider and shorter outline, with a swallowtail design at the back. This design allows for increased maneuverability and speed in smaller, less powerful waves.',
    },
    {
      'title': 'Shortboard',
      'image': './assets/images/shortboard.png',
      'shape': 'between 5\'6 and 7 feet',
      'description': 'Shortboards allow surfers to generate more speed and perform quick turns on the wave. The smaller size of the board also makes it easier to duck dive under incoming waves.',
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
