import { Component, OnInit } from '@angular/core';
import { CommentsService } from './comments.service';
import { Comment } from '../comments/models/commentModel';
import { CommentsPage } from './models/CommentsPage';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  listOfComments: Array<Comment>;
  private _pageSize = 20;
  private _q = ""
  private _selectedPostId = null;
  
  public listOfPostIds: number[];
  public totPages: number;
  public page: number;

  constructor(private commentService: CommentsService) { }

  ngOnInit() {
    this.listOfPostIds = this.commentService.getAllPostIds();
    this.searchComments(null, null);
  }

  loadSearch(msg){
    this._q = msg.text;
    this._selectedPostId = msg.postId > 0 ? msg.postId : null;
    this.searchComments(this._q, this._selectedPostId, 1, this._pageSize);
  }

  searchComments(q, postId, pageNumber = 1, pageSize?) {
    if (!pageSize ) { pageSize = this._pageSize; }
    this.commentService.searchElementsPageByQuery(q, postId, pageSize, pageNumber).subscribe(
      (res: CommentsPage) => {
        this.listOfComments = res.comments;
        this.totPages = res.totPage;
        this.page = res.page;
      },
      (error) => {
        console.error('Cannot load comments. Causes: ', error);
      }
    );
  }

  goToPage(page) {
    this.searchComments(this._q, this._selectedPostId, page, this._pageSize);
  }

}
