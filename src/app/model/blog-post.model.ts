import { BlogPostStatus } from './enums';

// Specchio del BlogPostDTO del backend.
// blogId è solo l'id: il backend non annida l'oggetto Blog completo nel DTO.
export interface BlogPost {
    id:          number;
    blogId:      number;
    publishedOn: string;       // LocalDateTime in Java → stringa ISO in JSON
    status:      BlogPostStatus;
    tags:        string;
    viewCount:   number;
    title:       string;
    content:     string;
}
