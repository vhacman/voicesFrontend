import { Role } from './enums';

// Specchio del PortalUserDTO del backend.
// Questa è la struttura che arriva dal server quando si chiede un utente.
export interface PortalUser {
    id:        number;
    firstName: string;
    lastName:  string;
    username:  string;
    dob:       string;       // LocalDate in Java → stringa ISO "YYYY-MM-DD" in JSON
    email:     string;
    role:      Role;
    // password NON è inclusa: il backend non la restituisce mai nei DTO
}
