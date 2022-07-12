import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AccesoResponse } from '../interfaces/AccesoResponse ';
import { ModalidadResponse } from '../interfaces/ModalidadResponse ';
import { HorarioResponse } from '../interfaces/HorarioResponse ';
import { ReservaResponse } from '../interfaces/ReservaResponse';
@Injectable({
  providedIn: 'root'
})
export class GymService {

  constructor(public http: HttpClient) { }

  getPersona(documento : number) {
    return this.http.get<AccesoResponse>('https://www.hostcatedral.com/api/appGym/public/getAlumno/'+documento);
   // return this.http.get<AccesoResponse>(`https://www.hostcatedral.com/api/appGym/public/getAlumno/${ idPersona }`);
  }

  getModalidades() {
    return this.http.get<ModalidadResponse[]>(`https://www.hostcatedral.com/api/appGym/public/getModalidades`);
  }

  getHorariosPorModalidad(idModalidad : number) {
    return this.http.get<HorarioResponse[]>(`https://www.hostcatedral.com/api/appGym/public/getHorariosModalidad/${ idModalidad}`);
  }

  crearReserva(fecha, alumno : any, horario: any) {

    console.log("fecha:"+fecha);
    const formData = new FormData();
    formData.append('fecha', fecha);
    formData.append('alumno', alumno);
    formData.append('horario', horario);
    return this.http.post<ReservaResponse>(`https://www.hostcatedral.com/api/appGym/public/addReserva`, formData);
}
}
