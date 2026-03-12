// Tutti gli enum del progetto, speculari a quelli del backend Java.
// Li centralizzo in un unico file per importarli facilmente ovunque.

// Ruoli utente: determina cosa può fare l'utente nel portale
export enum Role {
    BLOGGER = 'BLOGGER',
    ADMIN   = 'ADMIN'
}

// Stato di un post: controlla cosa è visibile agli altri utenti
export enum BlogPostStatus {
    PUBLISHED = 'PUBLISHED', // visibile a tutti
    HIDDEN    = 'HIDDEN',    // nascosto dall'autore
    BANNED    = 'BANNED'     // rimosso da un ADMIN
}

// Visibilità del blog: PUBLIC è leggibile da tutti, PRIVATE solo dall'autore e dagli ADMIN
export enum Visibility {
    PUBLIC  = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}

// Template grafico: determina il layout della pagina del blog
export enum Template {
    MINIMAL   = 'MINIMAL',
    MAGAZINE  = 'MAGAZINE',
    PORTFOLIO = 'PORTFOLIO',
    JOURNAL   = 'JOURNAL',
    CLASSIC   = 'CLASSIC'
}

// Palette colori: ogni valore corrisponde a un set di colori definito nel backend
export enum Palette {
    OCEAN  = 'OCEAN',
    FOREST = 'FOREST',
    SUNSET = 'SUNSET',
    NIGHT  = 'NIGHT',
    SAND   = 'SAND'
}
