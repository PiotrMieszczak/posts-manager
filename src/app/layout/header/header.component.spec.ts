import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { HeaderComponent } from './header.component';
import { UiQuery } from '../state/ui/ui.query';
import { UiService } from '../state/ui/ui.service';
import { HeaderModule } from './header.module';

describe('ButtonComponent', () => {
  let spectator: Spectator<HeaderComponent>;
  let uiQuery: UiQuery;
  let uiService: UiService;

  const createComponent = createComponentFactory({
    component: HeaderComponent,
    providers: [UiQuery, UiService],
    imports: [HeaderModule],
  });

  beforeEach(() => {
    spectator = createComponent();
    uiQuery = spectator.inject(UiQuery);
    uiService = spectator.inject(UiService);
  });

  it('should create', () => {
    expect(spectator.component).toBeDefined();
  });

  describe('Menu interaction', () => {
    it('should toggle menu on button click', () => {
      const updateSpy = jest.spyOn(uiService, 'updateMenuState');

      spectator.component.toggleMenu();
      spectator.detectChanges();

      expect(updateSpy).toBeCalledTimes(1);
      expect(updateSpy).toBeCalledWith(false);
    });
  });
});
