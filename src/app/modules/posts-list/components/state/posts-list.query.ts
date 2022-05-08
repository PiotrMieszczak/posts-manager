import { Injectable } from '@angular/core';
import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { PostsListStore, PostsListState } from './posts-list.store';

@Injectable({ providedIn: 'root' })
@QueryConfig({
  sortBy: 'id',
  sortByOrder: Order.ASC,
})
export class PostsListQuery extends QueryEntity<PostsListState> {
  constructor(protected override store: PostsListStore) {
    super(store);
  }
}
