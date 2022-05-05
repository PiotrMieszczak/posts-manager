import { Component, OnInit } from '@angular/core';
import { UiQuery } from '../state/ui/ui.query';
import { UiService } from '../state/ui/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private readonly uiQuery: UiQuery,
    private readonly uiService: UiService
  ) {}

  toggleMenu(): void {
    this.uiService.updateMenuState(!this.uiQuery.getValue().ui.isMenuOpen);
  }
}
