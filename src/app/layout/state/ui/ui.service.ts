import { Injectable } from '@angular/core';
import { UiStore } from './ui.store';

@Injectable({ providedIn: 'root' })
export class UiService {
  constructor(private uiStore: UiStore) {}

  updateMenuState(state: boolean): void {
    this.uiStore.update({ ui: { isMenuOpen: state } });
  }
}
