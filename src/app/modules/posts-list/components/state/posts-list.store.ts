import { Injectable } from '@angular/core';
import {
  ActiveState,
  EntityState,
  EntityStore,
  StoreConfig,
} from '@datorama/akita';
import { Post, SortStore } from '../../../../classes';

export interface PostsListState extends EntityState<Post>, ActiveState {
  filter: string;
  sort: SortStore;
  editedPost: Post | null;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'posts' })
export class PostsListStore extends EntityStore<PostsListState> {
  constructor() {
    super({
      filter: '',
      sort: { active: 'id', direction: 'asc' },
      editedPost: null,
    });
  }
}
