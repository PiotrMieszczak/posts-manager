import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { HeaderComponent } from './header.component';
import { HeaderModule } from './header.module';

describe('HeaderComponent', () => {
  let spectator: Spectator<HeaderComponent>;

  const createComponent = createComponentFactory({
    component: HeaderComponent,
    imports: [HeaderModule],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeDefined();
  });
});
