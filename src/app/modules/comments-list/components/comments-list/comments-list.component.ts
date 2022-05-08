import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsListComponent implements OnInit {
  @Input() postId: string | null = null;
  @ViewChild(MatSort, { static: true }) sort: MatSort | null = null;
  displayedColumns: string[] = ['id', 'name', 'email', 'body'];
  rowData = [];
  quickSearch: FormGroup;

  constructor(private readonly _fb: FormBuilder) {
    this.quickSearch = this.buildForm();
  }

  ngOnInit(): void {
    console.log(this);
  }

  addComment(): void {
    // TODO
  }

  editComment(comment: Comment): void {
    // TODO
  }

  deleteComment(comment: Comment): void {
    // TODO
  }

  private buildForm(): FormGroup {
    return this._fb.group({
      searchControl: [''],
    });
  }
}
