import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/posts-list/posts-list.module').then(
        (m) => m.PostsListModule
      ),
  },
  {
    path: 'comments',
    loadChildren: () =>
      import('./modules/comments-list/comments-list.module').then(
        (m) => m.CommentsListModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
