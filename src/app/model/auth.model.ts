import { Role } from './enums';

// Corpo della richiesta POST /voices/api/users/login
export interface LoginRequest {
    username: string;
    password: string;
}

// Risposta del backend dopo il login: contiene il JWT e i dati essenziali dell'utente.
// Il token va salvato nel localStorage e allegato a ogni richiesta successiva
// nell'header Authorization: "Bearer <token>"
// mustChangePassword arriva come stringa "true"/"false" perché il backend usa Map<String,String>.
export interface LoginResponse {
    token:              string;
    userId:             number;
    username:           string;
    role:               Role;
    mustChangePassword: string;
}
