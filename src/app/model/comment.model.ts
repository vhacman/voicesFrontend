// Specchio del CommentDTO del backend.
// postId e authorId sono solo id: il backend non annida gli oggetti completi.
// createdAt viene popolato lato server al momento del salvataggio,
// quindi in fase di creazione non lo mando (uso NewComment per questo).
export interface Comment {
    id:        number;
    content:   string;
    createdAt: string;   // LocalDateTime in Java → stringa ISO in JSON
    postId:    number;
    authorId:  number;
}

// Interfaccia usata per la richiesta POST /comments:
// ometto id e createdAt perché li gestisce il backend
export interface NewComment {
    content:  string;
    postId:   number;
    authorId: number;
}
