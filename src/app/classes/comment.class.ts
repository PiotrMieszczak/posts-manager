export class Comment {
  postId: number | null;
  id: number | null;
  name: string | null;
  email: string | null;
  body: string | null;

  constructor(prop: IComment) {
    this.postId = prop.postId;
    this.id = prop.id;
    this.name = prop.name;
    this.email = prop.email;
    this.body = prop.body;
    Object.freeze(this);
  }
}

export interface IComment {
  postId: number | null;
  id: number | null;
  name: string | null;
  email: string | null;
  body: string | null;
}
