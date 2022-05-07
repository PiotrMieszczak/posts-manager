import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostsListService } from '../../components/state/posts-list.service';
import { DIALOG_ACTION } from '../../enums/post-list.enums';
import { PostsListQuery } from '../../components/state/posts-list.query';
import { Post } from '../../../../classes';
import { filter } from 'rxjs';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss'],
})
export class PostDialogComponent implements OnInit {
  action = DIALOG_ACTION.ADD;
  form: FormGroup;
  private _editedPost: Post | null = null;

  constructor(
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { postId: number },
    private readonly _fb: FormBuilder,
    private readonly _postListQuery: PostsListQuery,
    private readonly _postListService: PostsListService
  ) {
    this.form = this.buildForm();
  }

  ngOnInit(): void {
    if (this.data) {
      this.getPostDataById();
      this.getEditedPost();
      this.action = DIALOG_ACTION.EDIT;
    }
  }

  getPostDataById(): void {
    this._postListService.getOne(this.data.postId.toString()).subscribe();
  }

  savePost(): void {
    const title = this.form.controls['titleControl'].value;
    const body = this.form.controls['bodyControl'].value;
    const dataToSave =
      this.action === DIALOG_ACTION.ADD
        ? { title, body }
        : {
            userId: this._editedPost?.userId,
            id: this._editedPost?.id,
            title,
            body,
          };
    this.dialogRef.close(dataToSave);
  }

  private buildForm(): FormGroup {
    return this._fb.group({
      titleControl: ['', Validators.required],
      bodyControl: ['', Validators.required],
    });
  }

  private getEditedPost(): void {
    this._postListQuery
      .select('editedPost')
      .pipe(filter(Boolean))
      .subscribe((post) => {
        this._editedPost = post;
        this.updateForm(post.title, post.body);
      });
  }

  private updateForm(titleData: string | null, bodyData: string | null): void {
    this.form.setValue({
      titleControl: titleData,
      bodyControl: bodyData,
    });
  }
}
