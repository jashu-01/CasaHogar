import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonApp, IonSplitPane, IonMenu, IonHeader, IonToolbar, IonTitle,
  IonContent, IonList, IonListHeader, IonMenuToggle, IonItem,
  IonIcon, IonLabel, IonRouterOutlet, IonRouterLink,
  IonButtons, IonButton, IonBadge,
  AlertController, ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline, newspaperOutline, heartOutline, calendarOutline,
  personOutline, notificationsOutline, settingsOutline,
  helpCircleOutline, logOutOutline, closeOutline,
  personCircleOutline, informationCircleOutline,
} from 'ionicons/icons';

interface NavPage {
  title: string;
  url: string;
  icon: string;
  badge?: number;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    CommonModule, RouterLink, RouterLinkActive,
    IonApp, IonSplitPane, IonMenu, IonHeader, IonToolbar, IonTitle,
    IonContent, IonList, IonListHeader, IonMenuToggle, IonItem,
    IonIcon, IonLabel, IonRouterLink, IonRouterOutlet,
    IonButtons, IonButton, IonBadge,
  ],
})
export class AppComponent {

  mainPages: NavPage[] = [
    { title: 'Inicio',       url: '/tabs/home',        icon: 'home-outline'         },
    { title: 'Noticias',     url: '/tabs/noticias',    icon: 'newspaper-outline'    },
    { title: 'Donar',        url: '/tabs/donar',       icon: 'heart-outline'        },
    { title: 'Actividades',  url: '/tabs/actividades', icon: 'calendar-outline'     },
    { title: 'Notificaciones', url: '/tabs/perfil',    icon: 'notifications-outline', badge: 3 },
    { title: 'Acerca de',    url: '/tabs/home',        icon: 'information-circle-outline' },
  ];

  // cuenta 
  accountPages: NavPage[] = [
    { title: 'Mi Perfil',     url: '/tabs/perfil',   icon: 'person-outline'      },
    { title: 'Configuración', url: '/tabs/perfil',   icon: 'settings-outline'    },
    { title: 'Ayuda y Soporte', url: '/tabs/perfil', icon: 'help-circle-outline' },
  ];

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
  ) {
    addIcons({
      homeOutline, newspaperOutline, heartOutline, calendarOutline,
      personOutline, notificationsOutline, settingsOutline,
      helpCircleOutline, logOutOutline, closeOutline,
      personCircleOutline, informationCircleOutline,
    });
  }

  // cerrar sesion 
  async cerrarSesion(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas salir?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Cerrar sesión',
          role: 'destructive',
          handler: async () => {
            //logica de bankend BDD
            const toast = await this.toastCtrl.create({
              message: 'Has cerrado sesión correctamente.',
              duration: 2500,
              position: 'bottom',
              color: 'success',
              icon: 'log-out-outline',
            });
            await toast.present();
            this.router.navigate(['/tabs/home']);
          },
        },
      ],
    });
    await alert.present();
  }
}

