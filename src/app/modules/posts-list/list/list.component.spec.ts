import { ListComponent } from './list.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { PostsListService } from '../state/posts-list.service';
import { PostsListQuery } from '../state/posts-list.query';
import { PostsListModule } from '../posts-list.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListComponent', () => {
  let spectator: Spectator<ListComponent>;
  let postListQuery: PostsListQuery;
  let postsListService: PostsListService;

  const createComponent = createComponentFactory({
    component: ListComponent,
    providers: [PostsListQuery, PostsListService],
    imports: [PostsListModule, HttpClientTestingModule],
  });

  beforeEach(() => {
    spectator = createComponent();
    postListQuery = spectator.inject(PostsListQuery);
    postsListService = spectator.inject(PostsListService);
  });

  it('should create', () => {
    expect(spectator.component).toBeDefined();
  });
});
