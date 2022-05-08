import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommentsListComponent } from './comments-list.component';
import { CommentsListQuery } from '../../state/comments-list.query';
import { CommentsListService } from '../../state/comments-list.service';
import { CommentsListStore } from '../../state/comments-list.store';
import { CommentsListModule } from '../../comments-list.module';

const mockPostData = [
  {
    postId: 1,
    id: 1,
    name: 'id labore ex et quam laborum',
    email: 'Eliseo@gardner.biz',
    body: 'laudantiumquam ',
  },
  {
    postId: 2,
    id: 1,
    name: 'id labore ex et quam laborum',
    email: 'Eliseo@gardner.biz',
    body: 'laudantiumquam ',
  },
  {
    postId: 2,
    id: 1,
    name: 'id labore ex et quam laborum',
    email: 'Eliseo@gardner.biz',
    body: 'laudantiumquam ',
  },
];

describe('ListComponent', () => {
  let spectator: Spectator<CommentsListComponent>;
  let commentsListQuery: CommentsListQuery;
  let commentsListService: CommentsListService;
  let commentsListStore: CommentsListStore;

  const createComponent = createComponentFactory({
    component: CommentsListComponent,
    providers: [CommentsListQuery, CommentsListService, CommentsListStore],
    imports: [CommentsListModule, HttpClientTestingModule],
  });

  beforeEach(() => {
    spectator = createComponent();
    commentsListQuery = spectator.inject(CommentsListQuery);
    commentsListService = spectator.inject(CommentsListService);
    commentsListStore = spectator.inject(CommentsListStore);
  });

  it('should create', () => {
    expect(spectator.component).toBeDefined();
  });

  describe('Quick Search', () => {
    it('should filter rows by search query', () => {
      spectator.component.ngOnInit();
      commentsListStore.add(mockPostData);

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
