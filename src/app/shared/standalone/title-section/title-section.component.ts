import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-section',
  standalone: true,
  imports: [],
  templateUrl: './title-section.component.html',
  styleUrl: './title-section.component.scss',
})
export class TitleSectionComponent {
  /**
   * Titulo que va ir en la secció
   */
  @Input() title: string = '';
  /**
   * Mensaje que acompaña al titulo
   */
  @Input() message: string = '';
}
