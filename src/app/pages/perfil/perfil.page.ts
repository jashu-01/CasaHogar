import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton,
  IonButton, IonIcon, IonContent, IonList, IonListHeader,
  IonItem, IonLabel, IonInput, IonToggle,
  IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonChip,
  IonBadge, IonNote, IonSelect, IonSelectOption,
  IonAccordion, IonAccordionGroup, IonSpinner,
  ToastController, AlertController, ActionSheetController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline, checkmarkOutline, personOutline,
  createOutline, locationOutline, trophyOutline,
  notificationsOutline, settingsOutline, helpCircleOutline,
  documentTextOutline, logOutOutline, mailOutline,
  callOutline, calendarOutline, timeOutline, heartOutline,
  ribbonOutline, cameraOutline, saveOutline, eyeOutline,
  eyeOffOutline, checkmarkCircle, checkmarkCircleOutline,
  checkmarkDoneOutline, ellipse, moonOutline, textOutline,
  languageOutline, globeOutline, analyticsOutline, keyOutline,
  trashOutline, headsetOutline, logoWhatsapp, mapOutline,
  lockClosedOutline, starOutline, bookOutline, peopleOutline,
  cashOutline, chevronForwardOutline, homeOutline, personAddOutline,
  shareOutline, copyOutline, openOutline, refreshOutline,
  informationCircleOutline, alertCircleOutline, imageOutline
} from 'ionicons/icons';

type Vista =
  | 'perfil' | 'informacion' | 'editar' | 'guardado'
  | 'notificaciones' | 'localidad' | 'logros'
  | 'configuracion' | 'soporte';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton,
    IonButton, IonIcon, IonContent, IonList, IonListHeader,
    IonItem, IonLabel, IonInput, IonToggle,
    IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonChip,
    IonBadge, IonNote, IonSelect, IonSelectOption,
    IonAccordion, IonAccordionGroup, IonSpinner
  ]
})
export class PerfilPage implements OnInit {

  vista: Vista = 'perfil';
  guardando    = false;
  showPass     = false;
  showPassConf = false;
  notifPendientes = 2;

  // ── Datos del usuario ─────────────────────────────────
  usuario = {
    nombre:       'Adiel',
    apellidoP:    'Mendoza',
    apellidoM:    'García',
    email:        'adiel.mendoza@gmail.com',
    telefono:     '271-313-22-19',
    fechaNac:     '1998-03-15',
    localidad:    'San Miguel, Córdoba, Ver.',
    miembroDesde: 'Enero 2024'
  };

  editForm = {
    nombre: '', apellidoP: '', apellidoM: '',
    email: '', telefono: '', fechaNac: '',
    password: '', passwordConfirm: '',
    estado: 'veracruz', localidad: '', cp: '94500'
  };

  // ── Notificaciones config ────────────────────────────
  configNotif = [
    { titulo: 'Nuevas actividades',     desc: 'Cuando se publiquen nuevas actividades',       icon: 'calendar-outline',      color: 'success', activo: true  },
    { titulo: 'Recordatorios',          desc: 'Recordatorio 1 hora antes de una actividad',   icon: 'time-outline',          color: 'warning', activo: true  },
    { titulo: 'Noticias de Casa Hogar', desc: 'Publicaciones nuevas en la página',             icon: 'notifications-outline', color: 'primary', activo: true  },
    { titulo: 'Donaciones',             desc: 'Confirmaciones de tus donaciones',              icon: 'heart-outline',         color: 'danger',  activo: true  },
    { titulo: 'Mensajes',               desc: 'Cuando alguien te envíe un mensaje',            icon: 'mail-outline',          color: 'tertiary',activo: false },
  ];

  notificaciones = [
    { titulo: 'Donación confirmada',        cuerpo: 'Tu donación de $200 MXN fue procesada correctamente.',  fecha: 'Hoy 10:30',   leida: false },
    { titulo: 'Nueva actividad disponible', cuerpo: 'Taller de música este sábado a las 10:00 am.',          fecha: 'Ayer 15:00',  leida: false },
    { titulo: 'Bienvenido a Casa Hogar',    cuerpo: 'Gracias por unirte a nuestra comunidad.',               fecha: 'Hace 3 días', leida: true  },
    { titulo: 'Recordatorio de actividad',  cuerpo: 'Clases de matemáticas comienzan en 1 hora.',            fecha: 'Hace 5 días', leida: true  },
  ];

  // ── Logros ───────────────────────────────────────────
  logros = [
    { titulo: 'Primer paso',       desc: 'Completaste tu registro',              icon: 'ribbon-outline',     obtenido: true  },
    { titulo: 'Corazón generoso',  desc: 'Realizaste tu primera donación',       icon: 'heart-outline',      obtenido: true  },
    { titulo: 'Voluntario activo', desc: 'Participaste en 10 actividades',       icon: 'people-outline',     obtenido: true  },
    { titulo: 'Embajador',         desc: 'Invitaste a 3 amigos a unirse',        icon: 'person-add-outline', obtenido: false },
    { titulo: 'Constante',         desc: 'Participaste 3 meses consecutivos',    icon: 'calendar-outline',   obtenido: false },
    { titulo: 'Gran donador',      desc: 'Donaste más de $1,000 MXN en total',   icon: 'cash-outline',       obtenido: false },
    { titulo: 'Lector ávido',      desc: 'Asististe al club de lectura 5 veces', icon: 'book-outline',       obtenido: false },
    { titulo: 'Estrella',          desc: 'Obtén todos los logros anteriores',    icon: 'star-outline',       obtenido: false },
  ];

  get logrosObtenidos(): number {
    return this.logros.filter(l => l.obtenido).length;
  }

  // ── Configuración ────────────────────────────────────
  config = {
    modoOscuro:    false,
    tamanoTexto:   'medium',
    idioma:        'es',
    region:        'mx',
    perfilPublico: true,
    datosUso:      true
  };

  // ── FAQ ──────────────────────────────────────────────
  faqs = [
    { id: 'f1', pregunta: '¿Cómo puedo cancelar una donación?',
      respuesta: 'Las donaciones en efectivo y especie pueden cancelarse contactándonos antes de la fecha de entrega. Las transferencias electrónicas requieren 3-5 días hábiles.' },
    { id: 'f2', pregunta: '¿Cómo registro mis actividades voluntarias?',
      respuesta: 'Ve a la sección Actividades y usa el botón "Unirme". Tu historial se actualiza automáticamente en tu perfil.' },
    { id: 'f3', pregunta: '¿Puedo cambiar mi correo electrónico?',
      respuesta: 'Sí. Ve a Editar Perfil, actualiza tu correo y guarda. Recibirás un correo de verificación en la nueva dirección.' },
    { id: 'f4', pregunta: '¿Mis datos personales están seguros?',
      respuesta: 'Sí. Usamos cifrado SSL y nunca compartimos tus datos con terceros. Revisa nuestra política de privacidad completa.' },
    { id: 'f5', pregunta: '¿Cómo elimino mi cuenta?',
      respuesta: 'Ve a Configuración → Eliminar cuenta. Esta acción es irreversible y eliminará todos tus datos.' }
  ];

  // ── Títulos ──────────────────────────────────────────
  private titulos: Record<Vista, string> = {
    perfil:         'Mi Perfil',
    informacion:    'Información Personal',
    editar:         'Editar Perfil',
    guardado:       'Guardado',
    notificaciones: 'Notificaciones',
    localidad:      'Mi Localidad',
    logros:         'Mis Logros',
    configuracion:  'Configuración',
    soporte:        'Soporte y Ayuda'
  };

  get tituloActual(): string { return this.titulos[this.vista]; }

  get iniciales(): string {
    return (this.usuario.nombre[0] + this.usuario.apellidoP[0]).toUpperCase();
  }

  // ─────────────────────────────────────────────────────
  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private actionCtrl: ActionSheetController
  ) {
    addIcons({
      arrowBackOutline, checkmarkOutline, personOutline,
      createOutline, locationOutline, trophyOutline,
      notificationsOutline, settingsOutline, helpCircleOutline,
      documentTextOutline, logOutOutline, mailOutline,
      callOutline, calendarOutline, timeOutline, heartOutline,
      ribbonOutline, cameraOutline, saveOutline, eyeOutline,
      eyeOffOutline, checkmarkCircle, checkmarkCircleOutline,
      checkmarkDoneOutline, ellipse, moonOutline, textOutline,
      languageOutline, globeOutline, analyticsOutline, keyOutline,
      trashOutline, headsetOutline, logoWhatsapp, mapOutline,
      lockClosedOutline, starOutline, bookOutline, peopleOutline,
      cashOutline, chevronForwardOutline, homeOutline, personAddOutline,
      shareOutline, copyOutline, openOutline, refreshOutline,
      informationCircleOutline, alertCircleOutline, imageOutline
    });
  }

  ngOnInit() { this.syncEditForm(); }

  // ══════════════════════════════════════════════════════
  // NAVEGACIÓN
  // ══════════════════════════════════════════════════════

  irA(v: Vista) {
    if (v === 'editar' || v === 'localidad') this.syncEditForm();
    this.vista = v;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private syncEditForm() {
    this.editForm = {
      nombre: this.usuario.nombre,
      apellidoP: this.usuario.apellidoP,
      apellidoM: this.usuario.apellidoM,
      email: this.usuario.email,
      telefono: this.usuario.telefono,
      fechaNac: this.usuario.fechaNac,
      password: '', passwordConfirm: '',
      estado: 'veracruz',
      localidad: this.usuario.localidad,
      cp: '94500'
    };
  }

  // ══════════════════════════════════════════════════════
  // PERFIL PRINCIPAL — acciones del header
  // ══════════════════════════════════════════════════════

  // Tap en avatar → mostrar opciones de foto
  async tapAvatar() {
    const sheet = await this.actionCtrl.create({
      header: 'Foto de perfil',
      buttons: [
        { text: 'Ver foto actual',    icon: 'eye-outline',    handler: () => this.toast('Sin foto configurada aún', 'medium') },
        { text: 'Tomar foto',         icon: 'camera-outline', handler: () => this.toast('Disponible en dispositivo móvil', 'medium') },
        { text: 'Elegir de galería',  icon: 'image-outline',  handler: () => this.toast('Disponible en dispositivo móvil', 'medium') },
        { text: 'Cancelar', role: 'cancel' }
      ]
    });
    await sheet.present();
  }

  // Tap en estadísticas
  async tapStat(tipo: 'meses' | 'donado' | 'actividades') {
    const msgs: Record<string, string> = {
      meses:       '12 meses como parte de la comunidad Casa Hogar 🎉',
      donado:      'Has donado $950 MXN en total. ¡Gracias por tu generosidad! ❤️',
      actividades: 'Has participado en 47 actividades. ¡Sigue así! 🏆'
    };
    await this.toast(msgs[tipo], 'success');
  }

  // Tap en chip "Voluntario Activo"
  async tapEstatus() {
    const alert = await this.alertCtrl.create({
      header:  'Voluntario Activo',
      message: 'Tienes este estatus porque has participado en al menos una actividad en los últimos 30 días. ¡Sigue participando para mantenerlo!',
      buttons: ['Entendido']
    });
    await alert.present();
  }

  // ══════════════════════════════════════════════════════
  // EDITAR PERFIL
  // ══════════════════════════════════════════════════════

  async guardarPerfil() {
    if (!this.editForm.nombre.trim() || !this.editForm.apellidoP.trim()) {
      await this.toast('El nombre y apellido paterno son obligatorios', 'warning'); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.editForm.email)) {
      await this.toast('Ingresa un correo electrónico válido', 'warning'); return;
    }
    if (this.editForm.telefono && !/^\d{7,15}$/.test(this.editForm.telefono.replace(/[-\s]/g,''))) {
      await this.toast('Ingresa un número de teléfono válido', 'warning'); return;
    }
    if (this.editForm.password && this.editForm.password.length < 6) {
      await this.toast('La contraseña debe tener al menos 6 caracteres', 'warning'); return;
    }
    if (this.editForm.password !== this.editForm.passwordConfirm) {
      await this.toast('Las contraseñas no coinciden', 'danger'); return;
    }

    this.guardando = true;
    await this.delay(1500);

    // Actualizar datos
    this.usuario.nombre    = this.editForm.nombre;
    this.usuario.apellidoP = this.editForm.apellidoP;
    this.usuario.apellidoM = this.editForm.apellidoM;
    this.usuario.email     = this.editForm.email;
    this.usuario.telefono  = this.editForm.telefono;
    this.usuario.fechaNac  = this.editForm.fechaNac;

    this.guardando = false;
    this.irA('guardado');
  }

  // Cambiar foto desde editar
  async cambiarFoto() {
    const sheet = await this.actionCtrl.create({
      header: 'Cambiar foto de perfil',
      buttons: [
        { text: 'Tomar foto',        icon: 'camera-outline', handler: () => this.toast('Cámara disponible en dispositivo móvil', 'medium') },
        { text: 'Elegir de galería', icon: 'image-outline',  handler: () => this.toast('Galería disponible en dispositivo móvil', 'medium') },
        { text: 'Cancelar', role: 'cancel' }
      ]
    });
    await sheet.present();
  }

  // Toggle mostrar/ocultar contraseña
  togglePass()     { this.showPass     = !this.showPass; }
  togglePassConf() { this.showPassConf = !this.showPassConf; }

  // ══════════════════════════════════════════════════════
  // LOCALIDAD
  // ══════════════════════════════════════════════════════

  async guardarLocalidad() {
    if (!this.editForm.localidad.trim()) {
      await this.toast('Escribe el nombre de tu localidad o municipio', 'warning'); return;
    }
    if (!this.editForm.estado) {
      await this.toast('Selecciona tu estado', 'warning'); return;
    }
    if (this.editForm.cp && this.editForm.cp.length !== 5) {
      await this.toast('El código postal debe tener 5 dígitos', 'warning'); return;
    }

    this.usuario.localidad = `${this.editForm.localidad}, ${this.estadoLabel}`;
    await this.toast('✓ Localidad actualizada correctamente', 'success');
    this.irA('perfil');
  }

  private get estadoLabel(): string {
    const estados: Record<string, string> = {
      veracruz: 'Ver.', oaxaca: 'Oax.',
      puebla: 'Pue.', cdmx: 'CDMX'
    };
    return estados[this.editForm.estado] ?? this.editForm.estado;
  }

  // Abrir mapa externo
  async abrirMapa() {
    const url = `https://maps.google.com/?q=${encodeURIComponent(this.usuario.localidad)}`;
    window.open(url, '_blank');
  }

  // ══════════════════════════════════════════════════════
  // NOTIFICACIONES
  // ══════════════════════════════════════════════════════

  async toggleNotif(notif: any) {
    const estado = notif.activo ? 'activada' : 'desactivada';
    await this.toast(`Notificación "${notif.titulo}" ${estado}`, 'medium');
  }

  async marcarTodasLeidas() {
    const sinLeer = this.notificaciones.filter(n => !n.leida).length;
    if (sinLeer === 0) {
      await this.toast('No hay notificaciones pendientes', 'medium'); return;
    }
    this.notificaciones.forEach(n => n.leida = true);
    this.notifPendientes = 0;
    await this.toast(`✓ ${sinLeer} notificación(es) marcada(s) como leídas`, 'success');
  }

  async tapNotificacion(notif: any) {
    notif.leida = true;
    this.notifPendientes = this.notificaciones.filter(n => !n.leida).length;
    const alert = await this.alertCtrl.create({
      header:  notif.titulo,
      message: `${notif.cuerpo}\n\n${notif.fecha}`,
      buttons: ['Cerrar']
    });
    await alert.present();
  }

  // ══════════════════════════════════════════════════════
  // LOGROS
  // ══════════════════════════════════════════════════════

  async tapLogro(logro: any) {
    if (logro.obtenido) {
      await this.toast(`🏆 "${logro.titulo}" — ¡Logro desbloqueado!`, 'success');
    } else {
      const alert = await this.alertCtrl.create({
        header:  `🔒 ${logro.titulo}`,
        message: `${logro.desc}\n\n¡Sigue participando para desbloquear este logro!`,
        buttons: ['¡Lo intentaré!']
      });
      await alert.present();
    }
  }

  // ══════════════════════════════════════════════════════
  // CONFIGURACIÓN
  // ══════════════════════════════════════════════════════

  async aplicarModoOscuro() {
    document.body.classList.toggle('dark', this.config.modoOscuro);
    await this.toast(
      this.config.modoOscuro ? '🌙 Modo oscuro activado' : '☀️ Modo claro activado',
      'medium'
    );
  }

  async cambiarTamanoTexto() {
    const labels: Record<string, string> = { small: 'Pequeño', medium: 'Mediano', large: 'Grande' };
    await this.toast(`Tamaño de texto: ${labels[this.config.tamanoTexto]}`, 'medium');
  }

  async cambiarIdioma() {
    const labels: Record<string, string> = { es: 'Español', en: 'English' };
    await this.toast(`Idioma cambiado a: ${labels[this.config.idioma]}`, 'medium');
  }

  async togglePerfilPublico() {
    const msg = this.config.perfilPublico
      ? 'Tu perfil ahora es visible para otros voluntarios'
      : 'Tu perfil ahora es privado';
    await this.toast(msg, 'medium');
  }

  async toggleDatosUso() {
    const msg = this.config.datosUso
      ? 'Gracias por ayudarnos a mejorar la app'
      : 'Datos de uso desactivados';
    await this.toast(msg, 'medium');
  }

  async cambiarPassword() {
    this.irA('editar');
    setTimeout(() => this.toast('⬇️ Desplázate hasta "Cambiar contraseña"', 'primary'), 500);
  }

  async guardarConfig() {
    await this.delay(800);
    await this.toast('✓ Configuración guardada correctamente', 'success');
    this.irA('perfil');
  }

  async confirmarEliminarCuenta() {
    const alert = await this.alertCtrl.create({
      header:  '⚠️ Eliminar cuenta',
      message: 'Esta acción es <strong>irreversible</strong>.<br><br>Se eliminarán todos tus datos, historial de donaciones y actividades.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar definitivamente',
          role: 'destructive',
          handler: async () => {
            await this.toast('Cuenta eliminada. ¡Hasta pronto!', 'danger');
            setTimeout(() => this.router.navigate(['/login'], { replaceUrl: true }), 1800);
          }
        }
      ]
    });
    await alert.present();
  }

  // ══════════════════════════════════════════════════════
  // SOPORTE
  // ══════════════════════════════════════════════════════

  async contactar(medio: string) {
    const urls: Record<string, string> = {
      email:    'mailto:soporte@casahogar.org.mx',
      whatsapp: 'https://wa.me/5212713120055',
      telefono: 'tel:+5212713120055'
    };
    const labels: Record<string, string> = {
      email:    '📧 Abriendo cliente de correo...',
      whatsapp: '💬 Abriendo WhatsApp...',
      telefono: '📞 Iniciando llamada...'
    };
    await this.toast(labels[medio], 'medium');
    setTimeout(() => { if (urls[medio]) window.open(urls[medio]); }, 600);
  }

  // ══════════════════════════════════════════════════════
  // TÉRMINOS Y PRIVACIDAD
  // ══════════════════════════════════════════════════════

  async abrirTerminos() {
    const alert = await this.alertCtrl.create({
      header:  'Términos y Privacidad',
      message: 'Casa Hogar respeta y protege tu privacidad. Tus datos personales son usados únicamente para gestionar tu participación en actividades y donaciones. Nunca compartimos tu información con terceros.',
      buttons: [
        { text: 'Ver completo', handler: () => { window.open('https://casahogar.org.mx/privacidad', '_blank'); } },
        { text: 'Cerrar', role: 'cancel' }
      ]
    });
    await alert.present();
  }

  // para cerra la secion 
  async confirmarLogout() {
    const alert = await this.alertCtrl.create({
      header:  'Cerrar sesión',
      message: '¿Estás seguro que deseas salir de tu cuenta?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Cerrar sesión',
          role: 'destructive',
          handler: () => {
            this.router.navigate(['/login'], { replaceUrl: true });
          }
        }
      ]
    });
    await alert.present();
  }

  // ══════════════════════════════════════════════════════
  // INFORMACIÓN PERSONAL — acciones de copia
  // ══════════════════════════════════════════════════════

  async copiarDato(valor: string, campo: string) {
    try {
      await navigator.clipboard.writeText(valor);
      await this.toast(`${campo} copiado al portapapeles ✓`, 'success');
    } catch {
      await this.toast(`${campo}: ${valor}`, 'medium');
    }
  }

  // ══════════════════════════════════════════════════════
  // UTILIDADES
  // ══════════════════════════════════════════════════════

  private async toast(msg: string, color: string) {
    const t = await this.toastCtrl.create({
      message: msg, duration: 2500,
      position: 'bottom', color,
      buttons: [{ icon: 'close', role: 'cancel' }]
    });
    await t.present();
  }

  private delay(ms: number) {
    return new Promise(r => setTimeout(r, ms));
  }
}