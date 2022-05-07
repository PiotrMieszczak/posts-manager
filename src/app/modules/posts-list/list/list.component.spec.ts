import { ListComponent } from './list.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { PostsListService } from '../state/posts-list.service';
import { PostsListQuery } from '../state/posts-list.query';
import { PostsListModule } from '../posts-list.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostsListStore } from '../state/posts-list.store';

const mockPostData = [
  {
    userId: 1,
    id: 1,
    title: 'title 1',
    body: 'body 1',
  },
  {
    userId: 2,
    id: 2,
    title: 'title 2',
    body: 'body 2',
  },
  {
    userId: 3,
    id: 3,
    title: 'title 3',
    body: 'body 3',
  },
  {
    userId: 4,
    id: 4,
    title: 'title 4',
    body: 'body 4',
  },
];

describe('ListComponent', () => {
  let spectator: Spectator<ListComponent>;
  let postListQuery: PostsListQuery;
  let postsListService: PostsListService;
  let postsListStore: PostsListStore;

  const createComponent = createComponentFactory({
    component: ListComponent,
    providers: [PostsListQuery, PostsListService, PostsListStore],
    imports: [PostsListModule, HttpClientTestingModule],
  });

  beforeEach(() => {
    spectator = createComponent();
    postListQuery = spectator.inject(PostsListQuery);
    postsListService = spectator.inject(PostsListService);
    postsListStore = spectator.inject(PostsListStore);
  });

  it('should create', () => {
    expect(spectator.component).toBeDefined();
  });

  describe('Quick Search', () => {
    it('should filter rows by search query', () => {
      spectator.component.ngOnInit();
      postsListStore.add(mockPostData);

      spectator.detectChanges();
      // @ts-ignore

      const input = spectator.component.quickSearch.controls.searchControl;
      input.setValue('title 4');

      input.valueChanges.subscribe(() => {
        expect(spectator.component.rowData).toHaveLength(1);
      });
    });
  });
});
