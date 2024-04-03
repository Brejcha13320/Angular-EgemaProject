import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ClaseColor } from '@interfaces/clase-color.interface';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {
  /**
   * Titulo del Badge
   */
  @Input() title: string = '';
  /**
   * Tipo del Badge
   */
  @Input() clase: ClaseColor = 'primary';

  getTypeClass() {
    return `text-bg-${this.clase}`;
  }
}
