import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { 
  IonContent, 
  IonButton, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonIcon 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, lockClosedOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonIcon
  ]
})
export class LoginPage implements OnInit {



  constructor(private router: Router) { 

    addIcons({ personOutline, lockClosedOutline });
  }
  
  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
  onLogin() {
    //  validación de usuario
     this.router.navigate(['/tabs/home']);

  }
  ngOnInit() { }
}