import { Injectable } from '@angular/core';
import { EntityStore, Store, StoreConfig } from '@datorama/akita';
import { UiState } from './classes/ui.classes';

@Injectable({ providedIn: 'root' })
export class UiStore extends EntityStore<UiState> {
  constructor() {
    super(new UiState(true));
  }
}
