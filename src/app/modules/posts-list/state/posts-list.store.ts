import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Post } from '../../../classes';

export interface PostsListState extends EntityState<Post> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'posts' })
export class PostsListStore extends EntityStore<PostsListState> {
  constructor() {
    super();
  }
}
