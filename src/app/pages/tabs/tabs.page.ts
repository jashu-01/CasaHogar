import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel,
  IonMenu, IonMenuToggle, IonHeader, IonToolbar, IonTitle,
  IonContent, IonList, IonItem, IonItemDivider,
  MenuController, AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline, heartOutline, newspaperOutline,
  calendarOutline, personOutline, notificationsOutline,
  settingsOutline, helpCircleOutline, logOutOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    // Ionic tabs
    IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel,
    // Ionic menu
    IonMenu, IonMenuToggle, IonHeader, IonToolbar, IonTitle,
    IonContent, IonList, IonItem, IonItemDivider
  ]
})
export class TabsPage {

  constructor(
    private menuCtrl: MenuController,
    private alertCtrl: AlertController,
    private router: Router
  ) {
    addIcons({
      homeOutline, heartOutline, newspaperOutline,
      calendarOutline, personOutline, notificationsOutline,
      settingsOutline, helpCircleOutline, logOutOutline
    });
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header:  'Cerrar sesión',
      message: '¿Estás seguro que deseas salir?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Cerrar sesión',
          role: 'destructive',
          handler: () => {
            this.menuCtrl.close();
            this.router.navigate(['/login'], { replaceUrl: true });
          }
        }
      ]
    });
    await alert.present();
  }
}



/*
import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, newspaper, heart, calendar, person } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet]
})
export class TabsPage {
  constructor() {
    addIcons({ home, newspaper, heart, calendar, person });
  }
}
*/