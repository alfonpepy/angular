import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alumno } from '../interfaces/AccesoResponse ';
import { GymService } from '../services/gym.service';
import { LoadingController } from '@ionic/angular';
import { ModalidadResponse } from '../interfaces/ModalidadResponse ';
import { HorarioResponse } from '../interfaces/HorarioResponse ';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {
 datos_alumno:Alumno;
 list_modalidades:ModalidadResponse[]=[];
 list_horarios:HorarioResponse[]=[];
 idModalidadSeleccionado;
 idHorarioSeleccionado
 fechaRserva:Date;
  constructor(
    private router:Router,
    private gymService:GymService,
    private loadingController:LoadingController
  ) { 
      this.datos_alumno=this.router.getCurrentNavigation().extras.state.datos_alumno;
      console.log(this.datos_alumno);
      
  }

  ngOnInit() {
    this.getModalidades();
    
  }

  async getModalidades() {

    const controller = await this.loadingController.create({
      message: 'Espere por favor...',
      spinner: 'crescent'
    });

    await controller.present();
    this.gymService.getModalidades().subscribe( (res) => {
      controller.dismiss();
      console.log(res);
      this.list_modalidades=res;
    },
    error=>{
       controller.dismiss();
      console.log(error);

    }
    
    );

  }

  async getHorariosPorModalidad() {

    const controller = await this.loadingController.create({
      message: 'Espere por favor...',
      spinner: 'crescent'
    });

    await controller.present();
    this.gymService.getHorariosPorModalidad(this.idModalidadSeleccionado).subscribe( (res) => {
      controller.dismiss();
      console.log(res);
      this.list_horarios=res;
    },
    error=>{
       controller.dismiss();
      console.log(error);

    }
    
    );

  }

  async setReserva() {

    const controller = await this.loadingController.create({
      message: 'Espere por favor...',
      spinner: 'crescent'
    });

    await controller.present();
    this.gymService.crearReserva(this.fechaRserva,this.datos_alumno.AlumnoID,this.idHorarioSeleccionado).subscribe( (res) => {
      controller.dismiss();
      console.log(res);
       this.router.navigate(['/home']);
      alert(res.message);
    },
    error=>{
       controller.dismiss();
      console.log(error);

    }
    
    );

  }

 

}
