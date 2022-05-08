import { AppComponent } from './app.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { AppModule } from './app.module';
import { APP_BASE_HREF } from '@angular/common';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;

  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [AppModule],
    providers: [{ provide: APP_BASE_HREF, useValue: '' }],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeDefined();
  });
});
