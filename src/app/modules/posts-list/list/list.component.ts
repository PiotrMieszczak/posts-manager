import { Component, OnInit } from '@angular/core';
import { PostsListService } from '../state/posts-list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(private readonly postsListService: PostsListService) {}

  ngOnInit(): void {
    this.postsListService.getAll().subscribe(console.log);
  }
}
