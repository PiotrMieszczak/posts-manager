import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let spectator: Spectator<SidenavComponent>;

  const createComponent = createComponentFactory(SidenavComponent);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeDefined();
  });
});
