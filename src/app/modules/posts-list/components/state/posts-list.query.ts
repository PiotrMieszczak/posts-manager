import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PostsListStore, PostsListState } from './posts-list.store';

@Injectable({ providedIn: 'root' })
export class PostsListQuery extends QueryEntity<PostsListState> {
  constructor(protected override store: PostsListStore) {
    super(store);
  }
}
