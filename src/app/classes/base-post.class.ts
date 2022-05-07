import { assign } from '../utils/utils';

export class Post {
  userId: number | null;
  id: number | null;
  title: string | null;
  body: string | null;

  constructor(prop: IPost) {
    this.userId = prop.userId;
    this.id = prop.id;
    this.title = prop.title;
    this.body = prop.body;
    Object.freeze(this);
  }
}

export interface IPost {
  userId: number | null;
  id: number | null;
  title: string | null;
  body: string | null;
}
