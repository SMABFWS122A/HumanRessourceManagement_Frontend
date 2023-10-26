import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-info-tile',
  templateUrl: './info-tile.component.html',
  styleUrls: ['./info-tile.component.css']
})
export class InfoTileComponent {
  @Input() headline!: string;
  @Input() number!: number;
  @Input() unitDesignation!: string;
  @Input() image!: string;
}
