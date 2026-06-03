import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { IonicModule } from '@ionic/angular';   
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { personOutline, callOutline, calendarOutline, locationOutline, lockClosedOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true, 
  imports: [CommonModule, IonicModule] 
})
export class RegisterPage implements OnInit {
  showPassword1: boolean = false;
  showPassword2: boolean = false;

  constructor(private router: Router) {
    addIcons({ 
      personOutline, callOutline, calendarOutline, locationOutline, 
      lockClosedOutline, eyeOutline, eyeOffOutline 
    });
  }

  ngOnInit() {}

  togglePassword1() {
    this.showPassword1 = !this.showPassword1;
  }

  togglePassword2() {
    this.showPassword2 = !this.showPassword2;
  }

  goToRegister() {
    console.log("Registrando usuario...");
    this.router.navigate(['/tabs/home']);
  }
}