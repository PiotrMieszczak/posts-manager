import { Injectable } from '@angular/core';
import { UiStore } from './ui.store';

@Injectable({ providedIn: 'root' })
export class UiService {
  constructor(private uiStore: UiStore) {}

  updateMenuState(state: boolean) {
    console.log('updateMenuState', state);
    this.uiStore.update({ ui: { isMenuOpen: state } });
  }
}
