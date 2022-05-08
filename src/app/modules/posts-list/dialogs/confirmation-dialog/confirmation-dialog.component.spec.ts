import {
  byText,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';

describe('PostDialogComponent', () => {
  let spectator: Spectator<ConfirmationDialogComponent>;
  let dialogRef: MatDialogRef<PostDialogComponent>;

  const createComponent = createComponentFactory({
    component: ConfirmationDialogComponent,
    imports: [MatDialogModule, MatSnackBarModule],
    mocks: [MatDialogRef],
  });

  beforeEach(() => {
    spectator = createComponent();
    dialogRef = spectator.inject(MatDialogRef);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should close dialog on confirmation btn click', () => {
    spectator.click(byText('Yes'));
    const closeSpy = jest.spyOn(dialogRef, 'close');
    expect(closeSpy).toHaveBeenCalledWith(true);
  });
});
