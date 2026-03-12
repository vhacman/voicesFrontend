import { Blog } from './blog.model';
import { Comment } from './comment.model';

export interface BlogPost {
    id?:       number;
    title:     string;
    text:      string;
    view:      number;
    image:     string;
    blog:      Blog;
    comments:  Comment[];
}
