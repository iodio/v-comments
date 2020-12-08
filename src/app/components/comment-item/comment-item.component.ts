import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/pages/comments/models/commentModel';

@Component({
  selector: 'vodafone-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {

  @Input() item: Comment;
  isImgLoaded = false;

  constructor() { }

  ngOnInit() {
  }

}
