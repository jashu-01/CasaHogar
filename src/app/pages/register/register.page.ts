import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  personOutline, mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline, 
  callOutline, locationOutline, calendarOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class RegisterPage implements OnInit {



  showPassword1: boolean= false;
  showPassword2: boolean= false;

  constructor() {
    addIcons({ 
      personOutline, 
      mailOutline, 
      lockClosedOutline, 
      eyeOutline, 
      eyeOffOutline, 
      callOutline, 
      locationOutline, 
      calendarOutline 
    });
  }
  
  goToRegister() {
    // Aquí podrías agregar lógica para registrar al usuario
    console.log('Registrando usuario...');
     this.router.navigate(['/tabs/home']);
  }
   ngOnInit() {
  }
  togglePassword1() {
    this.showPassword1 = !this.showPassword1;
  }

  togglePassword2() {
    this.showPassword2 = !this.showPassword2;
  }
  /*
  togglePassword1() { this.showPassword1 = !this.showPassword1; }
  togglePassword2() { this.showPassword2 = !this.showPassword2; }
*/

}
