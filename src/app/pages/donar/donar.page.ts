import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton,
  IonButton, IonIcon, IonContent, IonInput, IonTextarea,
  IonChip, IonBadge, ToastController, AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  cashOutline, cardOutline, shirtOutline, happyOutline,
  fastFoodOutline, medkitOutline, arrowForwardOutline,
  arrowBackOutline, locationOutline, personCircleOutline,
  personOutline, mailOutline, lockClosedOutline, calendarOutline,
  checkmarkCircleOutline, shieldCheckmarkOutline, businessOutline,
  cloudUploadOutline, copyOutline, informationCircleOutline,
  closeCircleOutline, heartOutline, heart, timeOutline
} from 'ionicons/icons';

interface TipoConfig {
  label:       string;
  icon:        string;
  infoClass:   string;
  acepta:      string[];
  noAcepta:    string[];
  placeholder: string;
}

@Component({
  selector: 'app-donar',
  templateUrl: './donar.page.html',
  styleUrls: ['./donar.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton,
    IonButton, IonIcon, IonContent, IonInput, IonTextarea,
    IonChip, IonBadge
  ]
})
export class DonarPage {

  // Navegación entre pasos: 0=selección, 1=detalle, 2=gracias
  paso = 0;
  tipoSeleccionado = '';
  metodo: 'tarjeta' | 'banco' = 'tarjeta';

  montos = [50, 100, 200, 500];

  form = {
    nombre:              '',
    email:               '',
    monto:               '' as string | number,
    montoPersonalizado:  '',
    mensaje:             '',
    numeroTarjeta:       '',
    vencimiento:         '',
    cvv:                 '',
    descripcionEspecie:  '',
    fechaEntrega:        ''
  };

  resumenDonacion = {
    tipo:   '',
    monto:  '',
    metodo: '',
    folio:  ''
  };

  // LOGICA DEL TIPO DE DOANCION
  private tiposConfig: Record<string, TipoConfig> = {
    ropa: {
      label:     'Ropa y Artículos',
      icon:      'shirt-outline',
      infoClass: 'info-blue',
      acepta: [
        'Ropa en buen estado (limpia y sin roturas)',
        'Calzado de todas las tallas',
        'Útiles escolares nuevos o en buen estado',
        'Artículos del hogar (cobijas, sábanas)',
        'Mochilas y bolsas escolares'
      ],
      noAcepta: [
        'Ropa raída, manchada o con roturas visibles',
        'Calzado muy desgastado',
        'Artículos rotos o en mal estado'
      ],
      placeholder: 'Ej: 5 pares de zapatos talla 28-32, 10 playeras, 3 cobijas...'
    },
    juguetes: {
      label:     'Juguetes',
      icon:      'happy-outline',
      infoClass: 'info-gold',
      acepta: [
        'Juguetes en buen estado (sin piezas rotas)',
        'Juegos de mesa completos',
        'Material didáctico: rompecabezas, legos',
        'Peluches limpios y en buen estado',
        'Material deportivo: pelotas, aros, cuerdas'
      ],
      noAcepta: [
        'Juguetes con piezas faltantes o rotas',
        'Juguetes con partes pequeñas peligrosas (niños < 3 años)',
        'Juguetes con pilas corroídas',
        'Juegos de mesa incompletos'
      ],
      placeholder: 'Ej: 2 juegos de mesa, 5 peluches, 3 pelotas de fútbol...'
    },
    comida: {
      label:     'Alimentos',
      icon:      'fast-food-outline',
      infoClass: 'info-red',
      acepta: [
        'Alimentos no perecederos (arroz, frijol, pasta)',
        'Latas de conservas (atún, sardina, vegetales)',
        'Aceite, azúcar, sal en empaque sellado',
        'Leche en polvo o UHT sellada',
        'Cereales y avena sellados',
        'Artículos de higiene personal'
      ],
      noAcepta: [
        'Alimentos abiertos o sin empaque original',
        'Productos con fecha de caducidad próxima (< 1 mes)',
        'Alimentos perecederos (frutas, verduras, carnes)',
        'Bebidas alcohólicas'
      ],
      placeholder: 'Ej: 10 kg de arroz, 20 latas de atún, 5 litros de aceite...'
    },
    medicamentos: {
      label:     'Medicamentos',
      icon:      'medkit-outline',
      infoClass: 'info-blue',
      acepta: [
        'Medicamentos de patente sin abrir y en fecha',
        'Vitaminas y suplementos sellados',
        'Artículos de primeros auxilios (vendas, gasas)',
        'Alcohol, agua oxigenada sellados',
        'Shampoo, jabón, pasta dental',
        'Pañales y toallitas húmedas'
      ],
      noAcepta: [
        'Medicamentos caducados o próximos a caducar (< 3 meses)',
        'Medicamentos abiertos o sin caja',
        'Medicamentos controlados sin receta',
        'Jeringas o material cortopunzante'
      ],
      placeholder: 'Ej: 5 cajas de paracetamol, 10 vitaminas infantiles, 20 vendas...'
    }
  };

  get tipoConfig(): TipoConfig {
    return this.tiposConfig[this.tipoSeleccionado] || this.tiposConfig['ropa'];
  }

  get esEspecie(): boolean {
    return ['ropa', 'juguetes', 'comida', 'medicamentos'].includes(this.tipoSeleccionado);
  }

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    addIcons({
      cashOutline, cardOutline, shirtOutline, happyOutline,
      fastFoodOutline, medkitOutline, arrowForwardOutline,
      arrowBackOutline, locationOutline, personCircleOutline,
      personOutline, mailOutline, lockClosedOutline, calendarOutline,
      checkmarkCircleOutline, shieldCheckmarkOutline, businessOutline,
      cloudUploadOutline, copyOutline, informationCircleOutline,
      closeCircleOutline, heartOutline, heart, timeOutline
    });
  }

  //----------------navegar 
  seleccionarTipo(tipo: string) {
    this.tipoSeleccionado = tipo;
    this.resetForm();
    this.paso = 1;
    // Reset método al cambiar tipo
    this.metodo = 'tarjeta';
  }

  volver() {
    this.paso = 0;
    this.tipoSeleccionado = '';
    this.resetForm();
  }

  // -----------------validar y confirmar 
  async confirmarDonacion() {
    if (!this.validarForm()) return;

    // generar para mostrar folio 
    const folio = 'CH-' + Date.now().toString().slice(-8).toUpperCase();

    // Armar resumen
    this.resumenDonacion = {
      tipo:   this.getLabelTipo(),
      monto:  this.getMontoLabel(),
      metodo: this.getMetodoLabel(),
      folio
    };

    // respuesta l ausuario -------------
    await this.simularEnvioEmail();

    this.paso = 2;
  }

  private async validarForm(): Promise<boolean> {
    if (!this.form.nombre.trim()) {
      await this.showToast('Por favor ingresa tu nombre completo', 'warning');
      return false;
    }
    if (!this.form.email.trim() || !this.form.email.includes('@')) {
      await this.showToast('Por favor ingresa un correo válido', 'warning');
      return false;
    }
    if (this.tipoSeleccionado === 'transferencia' && this.metodo === 'tarjeta') {
      if (!this.form.numeroTarjeta || this.form.numeroTarjeta.length < 16) {
        await this.showToast('Ingresa un número de tarjeta válido', 'warning');
        return false;
      }
      if (!this.form.vencimiento) {
        await this.showToast('Ingresa la fecha de vencimiento', 'warning');
        return false;
      }
      if (!this.form.cvv) {
        await this.showToast('Ingresa el CVV de tu tarjeta', 'warning');
        return false;
      }
    }
    if (this.esEspecie && !this.form.descripcionEspecie.trim()) {
      await this.showToast('Por favor describe qué vas a donar', 'warning');
      return false;
    }
    return true;
  }

  private async simularEnvioEmail() {
   //mensaje para el usuario
    const toast = await this.toastCtrl.create({
      message: `📧 Confirmación enviada a ${this.form.email}`,
      duration: 3000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }

  async copiar(texto: string) {
    try {
      await navigator.clipboard.writeText(texto);
      await this.showToast('Copiado al portapapeles ✓', 'success');
    } catch {
      await this.showToast('Selecciona el texto para copiar', 'medium');
    }
  }

  nuevaDonacion() {
    this.paso = 0;
    this.tipoSeleccionado = '';
    this.resetForm();
  }

  irAInicio() {
    this.router.navigate(['/tabs/home']);
  }

  // ── Helpers DEL MENU───────────────────────────────────────────────
  private getLabelTipo(): string {
    const labels: Record<string, string> = {
      efectivo:       'Efectivo',
      transferencia:  this.metodo === 'tarjeta' ? 'Tarjeta de crédito/débito' : 'Transferencia bancaria',
      ropa:           'Ropa y Artículos',
      juguetes:       'Juguetes',
      comida:         'Alimentos',
      medicamentos:   'Medicamentos'
    };
    return labels[this.tipoSeleccionado] || '';
  }

  private getMontoLabel(): string {
    if (this.esEspecie) return '';
    if (this.form.monto === 'otro') return `$${this.form.montoPersonalizado} MXN`;
    if (this.form.monto) return `$${this.form.monto} MXN`;
    return '';
  }

  private getMetodoLabel(): string {
    if (this.tipoSeleccionado === 'efectivo') return 'Entrega presencial';
    if (this.tipoSeleccionado === 'transferencia') {
      return this.metodo === 'tarjeta' ? 'Tarjeta en línea' : 'Transferencia SPEI';
    }
    return 'Entrega presencial';
  }

  private resetForm() {
    this.form = {
      nombre: '', email: '', monto: '', montoPersonalizado: '',
      mensaje: '', numeroTarjeta: '', vencimiento: '', cvv: '',
      descripcionEspecie: '', fechaEntrega: ''
    };
  }

  private async showToast(message: string, color: string) {
    const t = await this.toastCtrl.create({ message, duration: 2500, position: 'bottom', color });
    await t.present();
  }
}





