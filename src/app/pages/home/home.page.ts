import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButton, 
  IonCard, 
  IonCardContent, 
  IonListHeader, 
  IonFooter, 
  IonTabButton, 
  IonIcon, 
  IonTabBar 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, newspaper, heart, person } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonCard,
    IonCardContent,
    IonListHeader,
  ]
})
export class HomePage implements OnInit {

  testimonios = [
    { texto: '¡Gracias a Casa Hogar pude conectar con vecinos increíbles!' },
    { texto: 'Cada tarea que completo es una satisfacción enorme.' }
  ];

  constructor() {
    // Es necesario registrar los iconos para que se vean
    addIcons({ home, newspaper, heart, person });
  }

  ngOnInit() { }
}