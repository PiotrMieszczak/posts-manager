import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../../../environments/environment';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { PostsListService } from './posts-list.service';
import { PostsListStore } from './posts-list.store';
import { PostsListModule } from '../../posts-list.module';

const mockPostData = [
  {
    userId: 1,
    id: 1,
    title: 'title 1',
    body: 'body 1',
  },
];

describe('GetData on ngOnInit', () => {
  let spectator: SpectatorService<PostsListService>;
  let postsListService: PostsListService;
  let postsListStore: PostsListStore;
  let httpController: HttpTestingController;

  const createService = createServiceFactory({
    service: PostsListService,
    providers: [PostsListStore],
    imports: [PostsListModule, HttpClientTestingModule],
  });

  beforeEach(() => {
    spectator = createService();
    postsListService = spectator.inject(PostsListService);
    postsListStore = spectator.inject(PostsListStore);
    httpController = spectator.inject(HttpTestingController);
  });

  it('should get all data', function () {
    const url = environment.apiUrl + '/posts';

    spectator.service.getAll().subscribe((res) => {
      expect(res).toEqual(mockPostData);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}`,
    });

    req.flush(mockPostData);
  });
});
