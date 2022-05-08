import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Optional,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DIALOG_ACTION } from '../../../shared/enums/post-list.enums';
import { filter } from 'rxjs';
import { Comment } from '../../../../classes';
import { CommentsListQuery } from '../../state/comments-list.query';
import { CommentsListService } from '../../state/comments-list.service';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentDialogComponent implements OnInit {
  action = DIALOG_ACTION.ADD;
  form: FormGroup;
  private _editedPost: Comment | null = null;

  constructor(
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { commentId: number },
    private readonly _fb: FormBuilder,
    private readonly _commentsListQuery: CommentsListQuery,
    private readonly _commentsListService: CommentsListService
  ) {
    this.form = this.buildForm();
  }

  ngOnInit(): void {
    if (this.data) {
      this.getCommentDataById();
      this.getEditedComment();
      this.action = DIALOG_ACTION.EDIT;
    }
  }

  saveComment(): void {
    const name = this.form.controls['nameControl'].value;
    const body = this.form.controls['bodyControl'].value;
    const email = this.form.controls['emailControl'].value;
    const dataToSave =
      this.action === DIALOG_ACTION.ADD
        ? { name, body, email }
        : {
            postId: this._editedPost?.postId,
            id: this._editedPost?.id,
            name,
            body,
            email,
          };
    this.dialogRef.close(dataToSave);
  }

  private buildForm(): FormGroup {
    return this._fb.group({
      nameControl: ['', Validators.required],
      bodyControl: ['', Validators.required],
      emailControl: ['', [Validators.required, Validators.email]],
    });
  }

  private getCommentDataById(): void {
    this._commentsListService
      .getOne(this.data.commentId.toString())
      .subscribe();
  }

  private getEditedComment(): void {
    this._commentsListQuery
      .select('editedComment')
      .pipe(filter(Boolean))
      .subscribe((comment: Comment) => {
        this._editedPost = comment;
        this.updateForm(comment.name, comment.body, comment.email);
      });
  }

  private updateForm(
    nameData: string | null,
    bodyData: string | null,
    emailData: string | null
  ): void {
    this.form.setValue({
      nameControl: nameData,
      bodyControl: bodyData,
      emailControl: emailData,
    });
  }
}
