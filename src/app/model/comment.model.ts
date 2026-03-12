import { PortalUser } from './portal-user.model';
import { BlogPost } from './blog-post.model';

export interface Comment {
    id?:          number;
    text:         string;
    publishedOn:  string;
    author:       PortalUser;
    blogPost:     BlogPost;
}
