import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogPanelComponent } from '../../shared/log-panel/log-panel.component';
import { ProjectorComponent } from '../projection/projector.component';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-lifecycle',
  standalone: true,
  imports: [CommonModule, LogPanelComponent, ProjectorComponent, ChildComponent],
  templateUrl: './lifecycle.component.html',
  styleUrl: './lifecycle.component.scss'
})
export class LifecycleComponent
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
  @Input() parentTitle = 'Lifecycle Playground';
  childLabel = 'Initial Child Label';
  showChild = true;
  showProjectedFooter = true;
  showNote = true;
  private counter = 1;
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

  updateChildLabel(): void {
    this.childLabel = `Updated Label ${this.counter++}`;
    this.log('Parent updated child @Input');
  }

  toggleChild(): void {
    this.showChild = !this.showChild;
    this.log(`Toggled child: ${this.showChild ? 'show' : 'hide'}`);
  }

  toggleFooter(): void {
    this.showProjectedFooter = !this.showProjectedFooter;
    this.log(`Toggled footer slot: ${this.showProjectedFooter ? 'on' : 'off'}`);
  }

  toggleNote(): void {
    this.showNote = !this.showNote;
    this.log(`Toggled ng-template: ${this.showNote ? 'show' : 'hide'}`);
  }

  clearLogs(): void {
    this.logs = [];
  }

  private log(message: string): void {
    const time = new Date().toLocaleTimeString();
    this.pendingLogs = [`${time} • ${message}`, ...this.pendingLogs].slice(0, 18);
    if (this.flushScheduled) {
      return;
    }
    this.flushScheduled = true;
    queueMicrotask(() => {
      this.logs = [...this.pendingLogs, ...this.logs].slice(0, 18);
      this.pendingLogs = [];
      this.flushScheduled = false;
    });
  }
}
