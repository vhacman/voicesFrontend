import { PortalUser } from './portal-user.model';

export interface Blog {
    id?:          number;
    title:        string;
    description:  string;
    image:        string;
    author:       PortalUser;
}
