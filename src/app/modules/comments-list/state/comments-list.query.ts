import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CommentsListStore, CommentsListState } from './comments-list.store';

@Injectable({ providedIn: 'root' })
export class CommentsListQuery extends QueryEntity<CommentsListState> {
  constructor(protected override store: CommentsListStore) {
    super(store);
  }
}
