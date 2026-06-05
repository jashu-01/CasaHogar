import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { PerfilPage } from './perfil.page';

// Forzamos la declaración para evitar el error de tipado del entorno de pruebas si faltan paquetes
declare const describe: any, beforeEach: any, it: any, expect: any;

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilPage],
      providers: [provideIonicAngular()]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});