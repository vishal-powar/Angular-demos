import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { AboutInfo } from '../../core/about.resolver';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  private readonly route = inject(ActivatedRoute);

  readonly info$ = this.route.data.pipe(
    map((data) => data['info'] as AboutInfo)
  );
}
