import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { UiStore } from './ui.store';
import { UiState } from './classes/ui.classes';

@Injectable({ providedIn: 'root' })
export class UiQuery extends Query<UiState> {
  menuState$ = this.select((state) => state.ui.isMenuOpen);

  constructor(protected override store: UiStore) {
    super(store);
  }
}
