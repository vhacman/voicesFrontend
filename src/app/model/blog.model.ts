import { Palette, Template, Visibility } from './enums';

// Specchio del BlogDTO del backend.
// authorId è solo l'id: il backend non annida l'oggetto PortalUser completo nel DTO.
export interface Blog {
    id:          number;
    title:       string;
    cover:       string;
    description: string;
    authorId:    number;
    template:    Template;
    visibility:  Visibility;
    palette:     Palette;
}
