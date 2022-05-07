import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/posts-list',
    pathMatch: 'full',
  },
  {
    path: 'posts-list',
    component: ListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsListRoutingModule {}
