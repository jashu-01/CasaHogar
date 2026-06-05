import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'
import { IonContent, IonIcon, IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonIcon 
  ] 
})
export class SplashPage implements OnInit {

  loaded = false;

  constructor(private router: Router) {
    addIcons({ homeOutline });
  }

  ngOnInit() {
    // Activar animación de entrada
    setTimeout(() => { 
      this.loaded = true; 
    }, 100);

    setTimeout(() => {
      this.router.navigate(['/login'], { replaceUrl: true }); 
    }, 2500);
  }
}