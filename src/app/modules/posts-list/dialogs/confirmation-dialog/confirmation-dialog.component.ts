import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Optional,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public message: string,
    @Optional() public dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {}

  makeAction(): void {
    this.dialogRef.close(true);
  }
}
