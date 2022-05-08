import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Comment, Post, SortStore } from '../../../classes';

export interface CommentsListState extends EntityState<Comment> {
  filter: string;
  sort: SortStore;
  editedComment: Comment | null;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'comments' })
export class CommentsListStore extends EntityStore<CommentsListState> {
  constructor() {
    super({
      filter: '',
      sort: { active: 'id', direction: 'asc' },
      viewedPost: Post,
      editedComment: null,
    });
  }
}
