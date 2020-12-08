import { Comment } from './commentModel';

export interface CommentsPage {
    totPage: number;
    totSize: number;
    page: number;
    size: number;
    comments: Array<Comment>;
}
