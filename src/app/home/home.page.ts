import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { GymService } from '../services/gym.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  docPersona;
  constructor(
    private loadingController: LoadingController,
    private gymService:GymService,
    public alertController: AlertController,
    public router: Router
  ) {}
  

  async validar() {

    const controller = await this.loadingController.create({
      message: 'Espere por favor...',
      spinner: 'crescent'
    });

    await controller.present();
    this.gymService.getPersona(this.docPersona).subscribe( (res) => {
      controller.dismiss();
      console.log(res.data);
      
      if (Number.parseInt(res.data[0].dias_atraso) > 5) {

        this.Alerta('Atención','El alumno tiene '+res.data[0].dias_atraso+' días de atraso');
      } else {
        let navigationExtras:NavigationExtras={
          state:{
              datos_alumno:res.data[0]
          }
        };
        this.router.navigate(['/reserva'],navigationExtras);
      }
    },
    error=>{
       controller.dismiss();
      console.log(error.error.message);
      this.Alerta('Error',error.error.message);
    }
    
    );

  }
  async Alerta(titulo,msg) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

}
