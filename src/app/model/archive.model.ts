import { BlogPost } from './blog-post.model';

// Speculare alle classi PostsByMonth e PostsByYear del backend.
// Usate dalla risposta di GET /voices/api/blogs/{id}/archive
// per costruire la sidebar dell'archivio del blog.

export interface PostsByMonth {
    month: number;   // 1-12
    year:  number;
    posts: BlogPost[];
}

export interface PostsByYear {
    year:   number;
    months: PostsByMonth[];  // array di 12 elementi (indice 0 = gennaio)
}
