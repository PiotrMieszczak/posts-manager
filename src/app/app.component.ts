import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UiQuery } from './layout/state/ui/ui.query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isMenuOpen$: Observable<boolean>;

  constructor(private readonly uiQuery: UiQuery) {
    this.isMenuOpen$ = this.uiQuery.isMenuOpen$;
  }
}
