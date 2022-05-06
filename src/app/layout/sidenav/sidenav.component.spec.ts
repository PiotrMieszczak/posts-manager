import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { SidenavComponent } from './sidenav.component';

describe('ButtonComponent', () => {
  let spectator: Spectator<SidenavComponent>;

  const createComponent = createComponentFactory(SidenavComponent);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeDefined();
  });
});
