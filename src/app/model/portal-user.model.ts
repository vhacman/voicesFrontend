import { Blog } from './blog.model';

export interface PortalUser {
    id?:       number;
    nickname:  string;
    email?:    string;
    password?: string;
    bio?:      string;
    role?:     'BLOGGER' | 'ADMIN';
    blogs?:    Blog[];
}
