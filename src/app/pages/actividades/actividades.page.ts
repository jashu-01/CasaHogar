import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton,
  IonButton, IonIcon, IonContent, IonSegment, IonSegmentButton,
  IonLabel, IonChip, IonBadge
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  filterOutline, bookmarkOutline, bookmark,
  calendarOutline, timeOutline, schoolOutline,
  musicalNotesOutline, bookOutline, footballOutline,
  brushOutline, appsOutline
} from 'ionicons/icons';

interface Actividad {
  nombre:      string;
  categoria:   string;
  descripcion: string;
  fecha:       string;
  hora:        string;
  imagen:      string;
  color:       string;
  badgeColor:  string;
  catValor:    string;
  guardado:    boolean;
}

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton,
    IonButton, IonIcon, IonContent, IonSegment, IonSegmentButton,
    IonLabel, IonChip, IonBadge
  ]
})
export class ActividadesPage {

  segmento = 'todos';
  categoriaActiva = 'todos';

  categorias = [
    { label: 'Todos',       valor: 'todos',    icon: 'apps-outline'          },
    { label: 'Clases',      valor: 'clases',   icon: 'school-outline'        },
    { label: 'Música',      valor: 'musica',   icon: 'musical-notes-outline' },
    { label: 'Lectura',     valor: 'lectura',  icon: 'book-outline'          },
    { label: 'Deportes',    valor: 'deportes', icon: 'football-outline'      },
    { label: 'Arte',        valor: 'arte',     icon: 'brush-outline'         },
  ];

  actividades: Actividad[] = [
    {
      nombre:      'Clases de Matemáticas',
      categoria:   'Clases',
      descripcion: 'Refuerzo académico de álgebra y aritmética para niños de primaria. Grupos pequeños para mejor atención.',
      fecha:       'Lun, Mar, Vie',
      hora:        '4:00 PM',
      imagen:      'assets/ima1.png',
      color:       '#1e5c1e',
      badgeColor:  '#047857',
      catValor:    'clases',
      guardado:    false
    },
    {
      nombre:      'Taller de Música',
      categoria:   'Música',
      descripcion: 'Aprende guitarra, piano y percusión con nuestros instructores voluntarios. Para todas las edades.',
      fecha:       'Miércoles',
      hora:        '5:00 PM',
      imagen:      'assets/ima2.png',
      color:       '#7c3aed',
      badgeColor:  '#6d28d9',
      catValor:    'musica',
      guardado:    false
    },
    {
      nombre:      'Club de Lectura',
      categoria:   'Lectura',
      descripcion: 'Exploramos libros y cuentos juntos. Fomentamos el hábito de la lectura desde pequeños.',
      fecha:       'Jueves',
      hora:        '3:30 PM',
      imagen:      'assets/ima3.png',
      color:       '#0369a1',
      badgeColor:  '#075985',
      catValor:    'lectura',
      guardado:    false
    },
    {
      nombre:      'Fútbol y Deportes',
      categoria:   'Deportes',
      descripcion: 'Práctica deportiva en equipo para promover la salud, disciplina y trabajo en conjunto.',
      fecha:       'Sábados',
      hora:        '10:00 AM',
      imagen:      'assets/ima1.png',
      color:       '#b45309',
      badgeColor:  '#92400e',
      catValor:    'deportes',
      guardado:    false
    }
  ];

  galeriaItems = [
    { src: 'assets/ima8.png', alt: 'Evento 1', color: '#d4e8d4' },
    { src: 'assets/ima7.png', alt: 'Evento 2', color: '#d4dce8' },
    { src: 'assets/ima6.png', alt: 'Evento 3', color: '#e8d4d4' },
    { src: 'assets/ima5.png', alt: 'Evento 4', color: '#e8e4d4' },
    { src: 'assets/ima4.png', alt: 'Evento 5', color: '#e4d4e8' },
    { src: 'assets/ima3.png', alt: 'Evento 6', color: '#d4e8e4' },
  ];

  constructor() {
    addIcons({
      filterOutline, bookmarkOutline, bookmark,
      calendarOutline, timeOutline, schoolOutline,
      musicalNotesOutline, bookOutline, footballOutline,statu
      brushOutline, appsOutline
    });
  }

  get actividadesFiltradas(): Actividad[] {
    if (this.categoriaActiva === 'todos') return this.actividades;
    return this.actividades.filter(a => a.catValor === this.categoriaActiva);
  }

  get actividadesGuardadas(): Actividad[] {
    return this.actividades.filter(a => a.guardado);
  }

  filtrarCategoria(valor: string) {
    this.categoriaActiva = valor;
  }

  toggleGuardar(act: Actividad, event: Event) {
    event.stopPropagation();
    act.guardado = !act.guardado;
  }

  verDetalle(act: Actividad) {
    console.log('ver detalle:', act.nombre);
  }
}

