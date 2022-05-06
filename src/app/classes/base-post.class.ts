import { assign } from '../utils/utils';

export class Post {
  constructor(prop: IPost) {
    assign(this, prop);
    Object.freeze(this);
  }
}

export interface IPost {
  userId: number | null;
  id: number | null;
  title: string | null;
  body: string | null;
}
