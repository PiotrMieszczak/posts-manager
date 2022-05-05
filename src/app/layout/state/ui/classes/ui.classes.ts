export class UiState {
  ui: {
    isMenuOpen: boolean;
  };
  constructor(isMenuOpen: boolean) {
    this.ui = { isMenuOpen };
  }
}
