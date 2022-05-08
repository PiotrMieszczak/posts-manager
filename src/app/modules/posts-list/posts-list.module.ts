import { NgModule } from '@angular/core';
import { ListComponent } from './components/list/list.component';
import { PostsListRoutingModule } from './posts-list-routing.module';
import { PostDialogComponent } from './dialogs/post-dialog/post-dialog.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ListComponent, PostDialogComponent],
  imports: [PostsListRoutingModule, SharedModule],
  exports: [ListComponent, PostDialogComponent],
})
export class PostsListModule {}
