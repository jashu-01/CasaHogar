/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Al ser standalone, se importa directamente el componente
      imports: [
        HomePage,
        IonicModule.forRoot(),
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have stats defined', () => {
    expect(component.stats.length).toBeGreaterThan(0);
  });

  it('should have actividadesDestacadas defined', () => {
    expect(component.actividadesDestacadas.length).toBeGreaterThan(0);
  });

  it('should have testimonios defined', () => {
    expect(component.testimonios.length).toBeGreaterThan(0);
  });
});