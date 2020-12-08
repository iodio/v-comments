import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, find, filter, mapTo, switchMap, reduce, toArray, tap } from 'rxjs/operators';
import { Comment } from '../comments/models/commentModel';
import { CommentsPage } from '../comments/models/CommentsPage';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(public http?: HttpClient) { }

  allCommentsUrl = environment.BASE_URL + '/comments';

  /**
   * It returns all the post IDs
   * (assuming that postIDs is from 1 to 100)
   */
  public getAllPostIds() {
    return Array.from({length: 100}, (_, i) => i + 1);
  }

  /**
   * It returns all the comments
   * This is an utility functions, it is not actually used in the project.
   */
  private getAllComments() {
    return this.http.get(this.allCommentsUrl);
  }

  /**
   * It returns the Comment page
   * This is an utility functions, it is not actually used in the project.
   * @param size page size
   * @param page page number
   */
  private getCommentsByPage(size: number, page: number) {
    return this.http.get(this.allCommentsUrl).pipe(
      map((allElements: Array<Comment>) => this._getPage(allElements, size, page))
    );
  }

  /**
   * It returns comments page filtered by q
   * @param q (facultative) text to search in comments. If q is undefined, all elements will be returned
   * @param postID (facultative) postID to additional filtering
   * @param size (facultative) page size
   * @param page (facultative) page number
   */
  public searchElementsPageByQuery(q?: string, postID?: number, size?: number, page?: number) {
    return this.http.get(this.allCommentsUrl).pipe(
      map((allElements: Array<Comment>) => {
        let toReturn: any = allElements;
        if (postID) { toReturn = this._selectElementByPostId(toReturn, postID); }
        if (q) { toReturn = this._searchElement(toReturn, q); }
        return toReturn;
      }),
      map((allFilteredElements: Array<Comment>) => this._getPage(allFilteredElements, size, page))
    );
  }


  /**
   * Internal predicate to search element from a list
   * @param listOfElement List of elements
   * @param q text to search
   */
  private _searchElement(listOfElement: Array<Comment>, q: string) {
    return listOfElement.reduce( (a, c: Comment) => {
      if (c.name.toLowerCase().indexOf(q.toLowerCase()) >= 0
       || c.body.toLowerCase().indexOf(q.toLowerCase()) >= 0
       || c.email.toLowerCase().indexOf(q.toLowerCase()) >= 0 ) {
        a.push(c);
      }
      return a;
    }, []);
  }


  /**
   * Internal predicate to filter element for postID
   * @param listOfElement List of elements
   * @param postId post Id
   */
  private _selectElementByPostId(listOfElement: Array<Comment>, postId: number) {
    return listOfElement.reduce((a, c: Comment) => {
      if (c.postId === postId) { a.push(c); }
      return a;
    },
    []);
  }


  /**
   * Internal predicate to get a page of elements
   * @param listOfElement List of elements
   * @param size Page size, default value is size of list
   * @param page Page number, default value is 0
   */
  private _getPage(listOfElement: Array<Comment>, size: number, page = 1) {

    if (!page || page === 0) { page = 1; }

    const pageObject: CommentsPage = {
      page,
      size,
      totSize: listOfElement.length,
      totPage: Math.ceil(listOfElement.length / size),
      comments: [],
    };

    if (!size) { size = listOfElement.length; }
    const firstElement = size * (page - 1);
    const lastElement = size * page;

    pageObject.comments = listOfElement.slice(firstElement, lastElement);

    return pageObject;
  }


}

