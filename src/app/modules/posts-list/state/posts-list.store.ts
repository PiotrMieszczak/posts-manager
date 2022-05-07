import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Post } from '../../../classes';

export interface IPostListSort {
  active: string;
  direction: 'asc' | 'desc' | '';
}
export interface PostsListState extends EntityState<Post> {
  filter: string;
  sort: IPostListSort;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'posts' })
export class PostsListStore extends EntityStore<PostsListState> {
  constructor() {
    super({ filter: '' });
  }
}
