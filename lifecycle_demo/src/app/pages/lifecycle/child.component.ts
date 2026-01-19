import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogPanelComponent } from '../../shared/log-panel/log-panel.component';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule, LogPanelComponent],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss'
})
export class ChildComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input() label = '';
  logs: string[] = [];
  private pendingLogs: string[] = [];
  private flushScheduled = false;

  constructor() {
    this.log('constructor');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.log(`ngOnChanges: ${Object.keys(changes).join(', ') || 'none'}`);
  }

  ngOnInit(): void {
    this.log('ngOnInit');
  }

  ngDoCheck(): void {
    this.log('ngDoCheck');
  }

  ngAfterContentInit(): void {
    this.log('ngAfterContentInit');
  }

  ngAfterContentChecked(): void {
    this.log('ngAfterContentChecked');
  }

  ngAfterViewInit(): void {
    this.log('ngAfterViewInit');
  }

  ngAfterViewChecked(): void {
    this.log('ngAfterViewChecked');
  }

  ngOnDestroy(): void {
    this.log('ngOnDestroy');
  }

  private log(message: string): void {
    const time = new Date().toLocaleTimeString();
    this.pendingLogs = [`${time} • ${message}`, ...this.pendingLogs].slice(0, 12);
    if (this.flushScheduled) {
      return;
    }
    this.flushScheduled = true;
    queueMicrotask(() => {
      this.logs = [...this.pendingLogs, ...this.logs].slice(0, 12);
      this.pendingLogs = [];
      this.flushScheduled = false;
    });
  }
}
