import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log-panel.component.html',
  styleUrl: './log-panel.component.scss'
})
export class LogPanelComponent {
  @Input() title = 'Logs';
  @Input() entries: string[] = [];
}
