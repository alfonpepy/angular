export interface AccesoResponse {
    message: string;
    data:    Alumno[];
}

export interface Alumno {
    AlumnoID:       string;
    NroDocumento:   string;
    NombreApellido: string;
    Direccion:      string;
    Telefono:       string;
    Email:          string;
    dias_atraso:    string;
}