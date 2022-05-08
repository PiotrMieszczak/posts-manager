import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { PostsListRoutingModule } from './posts-list-routing.module';
import { MatTableModule } from '@angular/material/table';
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PostDialogComponent } from './dialogs/post-dialog/post-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ListComponent,
    PostDialogComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    PostsListRoutingModule,
    MatTableModule,
    TableVirtualScrollModule,
    ScrollingModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  exports: [ListComponent, PostDialogComponent],
})
export class PostsListModule {}
