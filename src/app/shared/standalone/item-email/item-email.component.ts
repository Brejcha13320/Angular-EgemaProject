import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-email',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-email.component.html',
  styleUrl: './item-email.component.scss',
})
export class ItemEmailComponent {
  /**
   * Email
   */
  @Input() email: string = '';
}
