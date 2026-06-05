import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton,
  IonButton, IonIcon, IonContent, IonToggle
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  searchOutline, ellipsisHorizontal, heartOutline, heart,
  chatbubbleOutline, shareSocialOutline
} from 'ionicons/icons';

interface Noticia {
  autor:       string;
  iniciales:   string;
  avatarColor: string;
  fecha:       string;
  imagen:      string;
  titulo:      string;
  texto:       string;
  likes:       number;
  comentarios: number;
  meGusta:     boolean;
  expandido:   boolean;
}

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton,
    IonButton, IonIcon, IonContent, IonToggle
  ]
})
export class NoticiasPage {

  soloOficial = false;

  noticias: Noticia[] = [
    {
      autor:       'Casa Hogar Córdoba',
      iniciales:   'CH',
      avatarColor: '#1e5c1e',
      fecha:       'Hace 2 horas',
      imagen:      'assets/noticias/evento1.jpg',
      titulo:      '"Peregrinación de la Palabra de Dios"',
      texto:       'Este fin de semana celebramos nuestra peregrinación anual. Fue un momento de unidad, reflexión y alegría para toda la comunidad. Gracias a todos los que participaron y apoyaron este evento tan especial para nosotros.',
      likes:       48,
      comentarios: 12,
      meGusta:     false,
      expandido:   false
    },
    {
      autor:       'Casa Hogar Córdoba',
      iniciales:   'CH',
      avatarColor: '#1e5c1e',
      fecha:       'Hace 1 día',
      imagen:      'assets/noticias/evento2.jpg',
      titulo:      'Taller de actividades recreativas',
      texto:       'Los niños disfrutaron de un increíble taller de manualidades y arte. Ver sus caras de felicidad es el mejor premio que podemos recibir. ¡Gracias a nuestros voluntarios por hacer esto posible!',
      likes:       35,
      comentarios: 8,
      meGusta:     false,
      expandido:   false
    },
    {
      autor:       'Casa Hogar Córdoba',
      iniciales:   'CH',
      avatarColor: '#1e5c1e',
      fecha:       'Hace 3 días',
      imagen:      'assets/noticias/evento3.jpg',
      titulo:      'Clase de matemáticas especial',
      texto:       'Esta semana iniciamos nuestras clases de refuerzo académico. Los estudiantes mostraron gran entusiasmo y dedicación. Continuamos construyendo un futuro mejor juntos.',
      likes:       22,
      comentarios: 5,
      meGusta:     false,
      expandido:   false
    }
  ];

  constructor() {
    addIcons({
      searchOutline, ellipsisHorizontal, heartOutline, heart,
      chatbubbleOutline, shareSocialOutline
    });
  }

  toggleLike(i: number) {
    this.noticias[i].meGusta = !this.noticias[i].meGusta;
    this.noticias[i].likes += this.noticias[i].meGusta ? 1 : -1;
  }

  toggleExpand(i: number) {
    this.noticias[i].expandido = !this.noticias[i].expandido;
  }

  comentar(i: number)   { /* abrir modal de comentarios */ }
  compartir(i: number)  { /* abrir share sheet nativo   */ }
}