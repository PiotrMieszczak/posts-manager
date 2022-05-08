import { NgModule } from '@angular/core';
import { CommentsListComponent } from './components/comments-list/comments-list.component';
import { CommentListRouteModule } from './comments-list-routing.module';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { CommentDialogComponent } from './dialogs/comment-dialog/post-dialog.component';

@NgModule({
  declarations: [CommentsListComponent, CommentDialogComponent],
  imports: [SharedModule, CommentListRouteModule, MatCardModule],
  exports: [CommentsListComponent],
})
export class CommentsListModule {}
