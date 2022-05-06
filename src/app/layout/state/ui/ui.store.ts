import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { UiState } from './classes/ui.classes';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'ui' })
export class UiStore extends EntityStore<UiState> {
  constructor() {
    super(new UiState(true));
  }
}
