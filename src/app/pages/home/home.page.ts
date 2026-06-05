import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton,
  IonButton, IonIcon, IonContent,
  IonList, IonItem, IonLabel, IonNote, IonBadge, IonChip,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonGrid, IonRow, IonCol,
  IonAvatar, IonThumbnail, IonRippleEffect,
} from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';
register();
import { addIcons } from 'ionicons';
import {
  heartOutline, heart, peopleOutline, homeOutline,
  ribbonOutline, notificationsOutline, handLeftOutline,
  chevronForwardOutline, star, starOutline,
  musicalNotesOutline, bookOutline, footballOutline,
  brushOutline, schoolOutline,
} from 'ionicons/icons';

interface HeroSlide  { img: string; alt: string; titulo: string; subtitulo: string; }
interface StatCard   { icon: string; numero: string; label: string; }
interface Actividad  { nombre: string; icon: string; color: string; }
interface Testimonio { nombre: string; rol: string; iniciales: string; avatarColor: string; texto: string; }

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  // CUSTOM_ELEMENTS_SCHEMA ocupadas en <swiper-container> y <swiper-slide>
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton,
    IonButton, IonIcon, IonContent,
    IonList, IonItem, IonLabel, IonNote, IonBadge, IonChip,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonGrid, IonRow, IonCol,
    IonAvatar, IonThumbnail, IonRippleEffect,
  ],
})
export class HomePage {

  swiperAutoplay = { delay: 3500, disableOnInteraction: false };

  heroSlides: HeroSlide[] = [
    {
      img: 'assets/ima1.png',
      alt: 'Niños jugando en el pasto',
      titulo: 'Juntos hacemos la diferencia',
      subtitulo: 'Cada niño merece un hogar lleno de amor',
    },
    {
      img: 'assets/ima2.png',
      alt: 'Niños con mascota',
      titulo: 'Creamos lazos que duran toda la vida',
      subtitulo: 'Voluntarios y familias unidas por un propósito',
    },
    {
      img: 'assets/ima3.png',
      alt: 'Niños corriendo en campo',
      titulo: 'Libertad, juego y alegría',
      subtitulo: 'Espacios seguros para crecer con dignidad',
    },
    {
      img: 'assets/banner-4.png',
      alt: 'Grupo de niños felices',
      titulo: 'Tu apoyo transforma vidas',
      subtitulo: 'Únete a nuestra comunidad de bienestar',
    },
  ];

  // tarejta de "estadísticas" valores que serian reflejados desde el dashoard de admin
  stats: StatCard[] = [
    { icon: 'people-outline', numero: '120+', label: 'Voluntarios' },
    { icon: 'home-outline',   numero: '85',   label: 'Familias'    },
    { icon: 'ribbon-outline', numero: '200+', label: 'Actividades' },
    { icon: 'heart-outline',  numero: '$28k', label: 'Donado'      },
  ];

  // para actividades
  actividadesDestacadas: Actividad[] = [
    { nombre: 'Música',   icon: 'musical-notes-outline', color: '#7c3aed' },
    { nombre: 'Lectura',  icon: 'book-outline',          color: '#0369a1' },
    { nombre: 'Deportes', icon: 'football-outline',      color: '#b45309' },
    { nombre: 'Arte',     icon: 'brush-outline',         color: '#be123c' },
    { nombre: 'Clases',   icon: 'school-outline',        color: '#047857' },
  ];

  // testim
  testimonios: Testimonio[] = [
    {
      nombre: 'María González', rol: 'Voluntaria', iniciales: 'MG',
      avatarColor: '#2d7a2d',
      texto: 'Gracias a Casa Hogar pude conectar con vecinos increíbles y sentir que realmente estoy aportando algo.',
    },
    {
      nombre: 'Carlos Ruiz', rol: 'Donador', iniciales: 'CR',
      avatarColor: '#0369a1',
      texto: 'Cada tarea que completo es una satisfacción enorme. Ver el impacto real me motiva a seguir.',
    },
    {
      nombre: 'Ana Pérez', rol: 'Voluntaria', iniciales: 'AP',
      avatarColor: '#7c3aed',
      texto: 'Una experiencia que cambió mi perspectiva de vida. Los niños son increíbles.',
    },
  ];

  readonly starsArray = [1, 2, 3, 4, 5];

  constructor(private router: Router) {
    addIcons({
      heartOutline, heart, peopleOutline, homeOutline,
      ribbonOutline, notificationsOutline, handLeftOutline,
      chevronForwardOutline, star, starOutline,
      musicalNotesOutline, bookOutline, footballOutline,
      brushOutline, schoolOutline,
    });
  }

  goToDonar():         void { this.router.navigate(['/tabs/donar']);       }
  goToActividades():   void { this.router.navigate(['/tabs/actividades']); }
  goToVoluntarios():   void { this.router.navigate(['/tabs/voluntarios']); }
  openNotifications(): void { console.log('Abrir notificaciones');          }
  verMas(sec: string): void { console.log('ver más:', sec);                 }
}

