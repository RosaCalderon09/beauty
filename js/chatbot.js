/**
 * ============================================================
 * BEAUTY SALON — AI CHATBOT WIDGET
 * Chatbot inteligente con base de conocimiento del salón.
 * Responde preguntas sobre servicios, precios, horarios,
 * productos, ubicación, citas y más.
 * Si no sabe algo → ofrece WhatsApp directo.
 * ============================================================
 */

// ─── CONFIG ──────────────────────────────────────────────────
const CHATBOT_CONFIG = {
  name:       'BeautyBot 💅',
  avatar:     'logo.jpeg',
  waNumber:   '50495307141',
  greeting:   '¡Hola! Soy **BeautyBot**, tu asistente virtual de Beauty Salon. 💅\n\n¿En qué puedo ayudarte hoy?',
  quickReplies: [
    '💇 Servicios',
    '💰 Precios',
    '📅 Agendar cita',
    '🛍️ Productos',
    '🕐 Horarios',
    '📍 Ubicación',
  ],
};

// ─── KNOWLEDGE BASE ──────────────────────────────────────────
const KB = [
  // ── SERVICIOS ──
  {
    patterns: ['servicio','servicios','qué ofrecen','qué hacen','tratamiento','tratamientos','que tienen'],
    response: `Ofrecemos **6 servicios especializados**:\n\n💇 **Corte de Cabello** — desde L.150\n🎨 **Tinte & Color** — desde L.400\n💅 **Manicure** — desde L.120\n🦶 **Pedicure** — desde L.150\n✨ **Tratamientos Capilares** — desde L.300\n🧖 **Spa Facial** — desde L.250\n\n¿Quieres saber más de alguno en específico?`,
    quickReplies: ['💇 Corte de cabello','🎨 Tinte','💅 Manicure','🦶 Pedicure','✨ Tratamiento capilar','🧖 Spa facial'],
  },

  // ── CORTE ──
  {
    patterns: ['corte','cortar','cortado','pelo','cabello corto','haircut'],
    response: `✂️ **Corte de Cabello**\n\nNuestros cortes incluyen:\n• Consulta personalizada\n• Lavado de cabello\n• Corte con técnica premium\n• Secado y peinado final\n• Productos de acabado\n\n💰 Desde **L.150**\n⏱️ Duración: 45-60 min\n\n¿Quieres agendar tu cita?`,
    quickReplies: ['📅 Agendar cita','💰 Ver precios completos','💬 Hablar con estilista'],
  },

  // ── TINTE / COLOR ──
  {
    patterns: ['tinte','tintura','color','coloracion','balayage','mechas','rubio','morocha','pintarme','pintado','decolorar','decoloracion'],
    response: `🎨 **Tinte & Coloración**\n\nOfrecemos:\n• Coloración completa o parcial\n• Mechas & Balayage\n• Ombré y Sombré\n• Tintes sin amoníaco\n• Tratamiento post-color incluido\n\n💰 Coloración completa desde **L.400**\n💰 Mechas/Balayage desde **L.650**\n⏱️ Duración: 90-120 min\n\n*El precio varía según longitud del cabello.*`,
    quickReplies: ['📅 Agendar cita','💰 Ver precios completos','💬 Consultar con estilista'],
  },

  // ── MANICURE ──
  {
    patterns: ['manicure','manicura','uñas','gel','acrilicas','acrílicas','esmalte','nail','nails','diseño de uñas'],
    response: `💅 **Manicure Profesional**\n\n• Manicure clásica — **L.120**\n• Manicure gel — **L.180**\n• Manicure + diseño artístico — **L.220**\n• Uñas acrílicas — **L.380**\n\n✨ Incluye: limpieza, exfoliación, masaje, diseño\n⏱️ Duración: 30-90 min según servicio`,
    quickReplies: ['📅 Agendar manicure','🦶 Ver pedicure','💰 Tabla de precios'],
  },

  // ── PEDICURE ──
  {
    patterns: ['pedicure','pedicura','pies','pies bonitos'],
    response: `🦶 **Pedicure de Lujo**\n\n• Pedicure clásica — **L.150**\n• Pedicure spa premium — **L.250**\n\n✨ Incluye: baño aromaterapéutico, exfoliación, eliminación de durezas, masaje y esmalte\n⏱️ Duración: 45-60 min`,
    quickReplies: ['📅 Agendar pedicure','💅 Ver manicure','💰 Tabla de precios'],
  },

  // ── TRATAMIENTOS CAPILARES ──
  {
    patterns: ['tratamiento','keratina','hidratacion','hidratación','cabello dañado','puntas','reparar cabello','nutritiva','brillo','caída de cabello','caida'],
    response: `✨ **Tratamientos Capilares**\n\n• Hidratación profunda — **L.300**\n• Keratina alisante — **L.800**\n• Alisado temporal — **L.550**\n• Reconstrucción capilar — **L.400**\n\nTodos incluyen diagnóstico capilar personalizado.\n⏱️ Duración: 60-180 min según servicio`,
    quickReplies: ['📅 Agendar tratamiento','💰 Ver precios','💬 Consultar con estilista'],
  },

  // ── SPA FACIAL ──
  {
    patterns: ['facial','spa','cara','piel','limpieza facial','hidratacion facial','acne','acné','manchas','rejuvenecimiento','mascarilla'],
    response: `🧖 **Spa Facial Premium**\n\n• Limpieza facial básica — **L.250**\n• Facial hidratante — **L.380**\n• Facial antiedad premium — **L.520**\n• Depilación cejas — **L.80**\n\n✨ Incluye: diagnóstico, vapor, extracción, mascarilla y masaje\n⏱️ Duración: 45-75 min`,
    quickReplies: ['📅 Agendar spa facial','💰 Ver precios','🛍️ Productos faciales'],
  },

  // ── PRECIOS ──
  {
    patterns: ['precio','precios','costo','costos','cuánto','cuánto cuesta','cuanto cuesta','cuanto cobran','cobran','tarifa','lempiras','barato'],
    response: `💰 **Lista de Precios**\n\n✂️ Corte simple — **L.150**\n✂️ Corte con estilo — **L.220**\n🎨 Tinte completo — **L.400**\n🎨 Mechas/Balayage — **L.650**\n🎨 Keratina — **L.800**\n💅 Manicure gel — **L.180**\n🦶 Pedicure spa — **L.250**\n🧖 Spa facial — desde **L.250**\n\n📦 **Paquetes especiales:**\n• Básico — **L.320** (corte+manicure+cejas)\n• Glamour — **L.680** (5 servicios)\n• Novia — **L.1,200** (paquete completo)\n\n¿Me dices qué servicio te interesa?`,
    quickReplies: ['📦 Paquetes especiales','📅 Agendar cita','🛍️ Ver productos'],
  },

  // ── PAQUETES ──
  {
    patterns: ['paquete','paquetes','combo','combos','novia','boda','oferta','descuento','glamour'],
    response: `📦 **Paquetes Especiales**\n\n🌸 **Básico — L.320** *(ahorras L.80)*\nCorte + Manicure + Cejas\n\n⭐ **Glamour — L.680** *(ahorras L.220)*\nCorte + Manicure gel + Pedicure spa + Limpieza facial + Cejas\n\n👰 **Novia — L.1,200** *(ahorras L.400)*\nPeinado + Maquillaje + Manicure + Pedicure + Facial + Tratamiento + Prueba incluida\n\n¡El paquete novia incluye prueba gratis!`,
    quickReplies: ['📅 Reservar paquete novia','📅 Reservar paquete glamour','💬 Consultar con estilista'],
  },

  // ── CITAS ──
  {
    patterns: ['cita','agendar','reservar','reserva','appointment','cuando puedo ir','quiero una cita','turno'],
    response: `📅 **Agendar Cita**\n\nPuedes agendar de 3 formas:\n\n1. 🌐 **Online** → Ve a nuestra página de [Contacto](contacto.html) y llena el formulario\n2. 💬 **WhatsApp** → Escríbenos directamente\n3. 📞 **Llamada** → +504 9530-7141\n\nTe confirmaremos tu cita en menos de 1 hora. 🕐`,
    quickReplies: ['📋 Ir al formulario de citas','💬 Escribir por WhatsApp','📞 Llamar ahora'],
  },

  // ── PRODUCTOS ──
  {
    patterns: ['producto','productos','shampoo','champú','mascarilla','serum','sérum','crema','esmalte','aceite','loción','comprar','venta','tienda'],
    response: `🛍️ **Catálogo de Productos**\n\nTenemos productos premium en 4 categorías:\n\n🌿 **Cabello** — Shampoos, mascarillas, serums\n💅 **Uñas** — Esmaltes gel, top coats, kits\n✨ **Facial** — Cremas, serums, mascarillas\n🌸 **Cuerpo** — Aceites, exfoliantes, lociones\n\nVisita nuestra [tienda online](productos.html) para ver todos los productos con precios.\n\n¿Quieres reservar algún producto por WhatsApp?`,
    quickReplies: ['🛒 Ver catálogo completo','💬 Reservar producto por WhatsApp'],
  },

  // ── HORARIOS ──
  {
    patterns: ['horario','horarios','hora','horas','abierto','abren','cierran','cuando','días','lunes','martes','miércoles','jueves','viernes','sábado','domingo','festivos'],
    response: `🕐 **Horarios de Atención**\n\n📅 **Lunes a Viernes**\n8:00 AM — 7:00 PM\n\n📅 **Sábado**\n8:00 AM — 6:00 PM\n\n🚫 **Domingo** — Cerrado\n\n🎉 Feriados: consultar disponibilidad\n\n*Recomendamos reservar con 24h de anticipación.*`,
    quickReplies: ['📅 Reservar cita','💬 Consultar disponibilidad'],
  },

  // ── UBICACIÓN ──
  {
    patterns: ['dirección','direccion','donde','dónde','ubicacion','ubicación','como llegar','mapa','lugar','colonia','tegucigalpa','honduras'],
    response: `📍 **Nuestra Ubicación**\n\nCol. La Granja, Block 5, Casa #12\nTegucigalpa, Honduras\n\n📞 **Teléfono:** +504 9530-7141\n📧 **Email:** info@beautysalon.hn\n\n*Buscamos en Google Maps: "Beauty Salon Tegucigalpa"*`,
    quickReplies: ['💬 Escribir por WhatsApp','📅 Agendar cita','🕐 Ver horarios'],
  },

  // ── CONTACTO ──
  {
    patterns: ['contacto','contactar','comunicar','número','numero','telefono','teléfono','email','whatsapp','instagram','facebook','redes'],
    response: `📱 **Contáctanos**\n\n📞 **Teléfono:** +504 9530-7141\n💬 **WhatsApp:** +504 9530-7141\n📧 **Email:** info@beautysalon.hn\n🌐 **Web:** beautysalon.hn\n\n📲 **Redes Sociales:**\n• Instagram: @beautysalonhn\n• Facebook: Beauty Salon Honduras\n• TikTok: @beautysalonhn`,
    quickReplies: ['💬 WhatsApp directo','📅 Agendar cita'],
  },

  // ── NOSOTROS ──
  {
    patterns: ['nosotros','salon','historia','años','experiencia','fundación','fundacion','quienes son','quiénes son','profesional'],
    response: `💫 **Sobre Beauty Salon**\n\nSomos un salón de belleza premium con **más de 10 años** de experiencia en Tegucigalpa, Honduras.\n\n✅ Fundado en 2014\n✅ +2,000 clientas atendidas\n✅ 6 especialistas certificadas\n✅ Productos 100% premium\n✅ 98% de satisfacción\n\nNuestra misión: que cada mujer salga sintiéndose extraordinaria. 🌟`,
    quickReplies: ['📅 Agendar cita','💅 Ver servicios','🛍️ Ver productos'],
  },

  // ── RESERVAR / CONFIRMAR ──
  {
    patterns: ['ok','okay','sí','si','quiero','listo','claro','perfecto','bueno','dale'],
    response: `¡Perfecto! 😊 ¿Cómo preferirías continuar?`,
    quickReplies: ['📋 Formulario de citas online','💬 Escribir por WhatsApp','📞 Llamar +504 9530-7141'],
  },

  // ── GRACIAS ──
  {
    patterns: ['gracias','thank','thanks','muchas gracias','de nada','excelente','genial','chevere','chévere'],
    response: `¡De nada! Fue un placer ayudarte. 💕\n\nSi tienes más preguntas, aquí estaré. ¡Te esperamos en Beauty Salon! 💅✨`,
    quickReplies: ['📅 Agendar cita','🏠 Inicio','💬 Otra pregunta'],
  },

  // ── SALUDOS ──
  {
    patterns: ['hola','buenas','hello','hi','buen dia','buenos dias','buenas tardes','buenas noches','hey'],
    response: `¡Hola! 👋 ¡Qué gusto saludarte!\n\nSoy **BeautyBot**, la asistente virtual de Beauty Salon. Puedo ayudarte con información sobre servicios, precios, citas, productos y más.\n\n¿Qué deseas saber?`,
    quickReplies: ['💇 Servicios','💰 Precios','📅 Agendar cita','🛍️ Productos'],
  },
];

// ─── FALLBACK ──────────────────────────────────────────────
const FALLBACK = {
  response: `Mmm, no encuentro información exacta sobre eso. 🤔\n\nPuedes preguntarle directamente a nuestra estilista — ¡ella sabrá ayudarte mejor!`,
  quickReplies: ['💬 Escribir por WhatsApp','📞 Llamar +504 9530-7141','📅 Agendar cita'],
};

// ─── CHATBOT ENGINE ────────────────────────────────────────
function findBestResponse(userInput) {
  const input = userInput.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove accents
    .trim();

  let bestMatch = null;
  let bestScore  = 0;

  for (const entry of KB) {
    let score = 0;
    for (const pattern of entry.patterns) {
      const norm = pattern.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (input.includes(norm)) {
        score += norm.length; // longer matches = higher priority
      }
    }
    if (score > bestScore) {
      bestScore  = score;
      bestMatch  = entry;
    }
  }

  return bestScore > 0 ? bestMatch : FALLBACK;
}

// ─── MARKDOWN-LITE RENDERER ───────────────────────────────
function renderMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:var(--color-gold);text-decoration:underline;">$1</a>')
    .replace(/\n/g, '<br/>');
}

// ─── CHATBOT UI CLASS ──────────────────────────────────────
class BeautyChatbot {
  constructor() {
    this.isOpen       = false;
    this.isTyping     = false;
    this.messageCount = 0;
    this.el           = null;
    this.init();
  }

  init() {
    this.injectStyles();
    this.buildHTML();
    this.attachEvents();
    // Auto-greet after 3s on first open
    setTimeout(() => this.showBubbleHint(), 4000);
  }

  injectStyles() {
    const style = document.createElement('style');
    style.id = 'chatbot-styles';
    style.textContent = `
      /* ── CHATBOT ── */
      :root {
        --cb-gold: #C9A96E;
        --cb-gold-dark: #9B7B42;
        --cb-dark: #2C2420;
        --cb-beige: #FAF0EC;
        --cb-white: #FFFFFF;
        --cb-radius: 20px;
        --cb-shadow: 0 12px 48px rgba(44,36,32,0.22);
      }

      #chatbot-launcher {
        position: fixed;
        bottom: 28px;
        right: 28px;
        z-index: 1000;
        width: 62px;
        height: 62px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--cb-gold), var(--cb-gold-dark));
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 24px rgba(201,169,110,0.5);
        transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s;
        animation: cbPulse 3s infinite;
      }
      #chatbot-launcher:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 36px rgba(201,169,110,0.7);
      }
      #chatbot-launcher.open {
        animation: none;
        background: linear-gradient(135deg, #5C4033, var(--cb-dark));
      }
      #chatbot-launcher svg { width:30px; height:30px; fill:white; transition:opacity 0.2s; }
      #chatbot-launcher .icon-chat { display:block; }
      #chatbot-launcher .icon-close { display:none; }
      #chatbot-launcher.open .icon-chat  { display:none; }
      #chatbot-launcher.open .icon-close { display:block; }

      /* Notification badge */
      #chatbot-badge {
        position: absolute;
        top: -2px;
        right: -2px;
        width: 18px;
        height: 18px;
        background: #e74c3c;
        border-radius: 50%;
        border: 2px solid white;
        font-size: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 700;
        animation: badgePop 0.4s ease;
      }

      /* Bubble hint */
      #chatbot-hint {
        position: fixed;
        bottom: 102px;
        right: 28px;
        z-index: 999;
        background: var(--cb-white);
        padding: 10px 16px;
        border-radius: 12px 12px 4px 12px;
        box-shadow: 0 4px 20px rgba(44,36,32,0.18);
        font-size: 0.83rem;
        color: var(--cb-dark);
        max-width: 200px;
        line-height: 1.45;
        opacity: 0;
        transform: translateY(8px);
        transition: opacity 0.4s ease, transform 0.4s ease;
        pointer-events: none;
      }
      #chatbot-hint.show { opacity: 1; transform: translateY(0); pointer-events: all; }
      #chatbot-hint::after {
        content: '';
        position: absolute;
        bottom: -8px;
        right: 20px;
        border: 5px solid transparent;
        border-top-color: var(--cb-white);
        border-bottom: none;
      }

      /* Chat window */
      #chatbot-window {
        position: fixed;
        bottom: 104px;
        right: 28px;
        z-index: 999;
        width: 360px;
        max-height: 560px;
        display: flex;
        flex-direction: column;
        background: var(--cb-white);
        border-radius: var(--cb-radius);
        box-shadow: var(--cb-shadow);
        overflow: hidden;
        transform: scale(0.85) translateY(20px);
        transform-origin: bottom right;
        opacity: 0;
        visibility: hidden;
        transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s, visibility 0.35s;
      }
      #chatbot-window.open {
        transform: scale(1) translateY(0);
        opacity: 1;
        visibility: visible;
      }

      /* Header */
      .cb-header {
        background: linear-gradient(135deg, var(--cb-dark), #4A3728);
        padding: 14px 16px;
        display: flex;
        align-items: center;
        gap: 12px;
        flex-shrink: 0;
      }
      .cb-header-avatar {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid var(--cb-gold);
        flex-shrink: 0;
      }
      .cb-header-info { flex: 1; }
      .cb-header-name {
        color: white;
        font-weight: 600;
        font-size: 0.95rem;
        font-family: 'Cormorant Garamond', serif;
      }
      .cb-header-status {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 0.72rem;
        color: rgba(255,255,255,0.6);
      }
      .cb-status-dot {
        width: 6px;
        height: 6px;
        background: #2ecc71;
        border-radius: 50%;
        animation: cbPulseGreen 2s infinite;
      }
      .cb-header-wa {
        background: #25D366;
        color: white;
        border: none;
        border-radius: 20px;
        padding: 5px 12px;
        font-size: 0.75rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;
        font-family: 'Jost', sans-serif;
        font-weight: 500;
        transition: background 0.2s;
      }
      .cb-header-wa:hover { background: #1da554; }

      /* Messages container */
      .cb-messages {
        flex: 1;
        overflow-y: auto;
        padding: 14px 14px 8px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: linear-gradient(180deg, #faf8f5 0%, var(--cb-white) 100%);
        scroll-behavior: smooth;
      }
      .cb-messages::-webkit-scrollbar { width: 4px; }
      .cb-messages::-webkit-scrollbar-track { background: transparent; }
      .cb-messages::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.3); border-radius: 4px; }

      /* Bubbles */
      .cb-msg {
        display: flex;
        align-items: flex-end;
        gap: 8px;
        animation: msgAppear 0.3s ease;
      }
      .cb-msg.bot  { align-self: flex-start; }
      .cb-msg.user { align-self: flex-end; flex-direction: row-reverse; }

      .cb-bot-avatar {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        object-fit: cover;
        border: 1.5px solid var(--cb-gold);
        flex-shrink: 0;
      }

      .cb-bubble {
        max-width: 82%;
        padding: 10px 14px;
        border-radius: 16px;
        font-size: 0.875rem;
        line-height: 1.55;
      }
      .cb-msg.bot  .cb-bubble {
        background: var(--cb-white);
        color: #3a2a1e;
        border-radius: 4px 16px 16px 16px;
        box-shadow: 0 2px 8px rgba(44,36,32,0.08);
        border: 1px solid rgba(201,169,110,0.15);
      }
      .cb-msg.user .cb-bubble {
        background: linear-gradient(135deg, var(--cb-gold), var(--cb-gold-dark));
        color: white;
        border-radius: 16px 4px 16px 16px;
      }

      .cb-time {
        font-size: 0.65rem;
        color: rgba(44,36,32,0.35);
        margin-top: 3px;
        display: block;
        text-align: center;
        align-self: flex-end;
      }

      /* Typing */
      .cb-typing {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 10px 14px;
        background: var(--cb-white);
        border-radius: 4px 16px 16px 16px;
        box-shadow: 0 2px 8px rgba(44,36,32,0.08);
        width: fit-content;
        border: 1px solid rgba(201,169,110,0.15);
      }
      .cb-typing span {
        width: 7px;
        height: 7px;
        background: var(--cb-gold);
        border-radius: 50%;
        display: block;
        animation: typingDot 1.4s infinite ease-in-out;
      }
      .cb-typing span:nth-child(2) { animation-delay: 0.2s; }
      .cb-typing span:nth-child(3) { animation-delay: 0.4s; }

      /* Quick replies */
      .cb-quick-replies {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        padding: 0 14px 8px;
        animation: msgAppear 0.3s ease;
      }
      .cb-qr-btn {
        background: var(--cb-beige);
        border: 1.5px solid rgba(201,169,110,0.3);
        color: #4A3728;
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 0.78rem;
        cursor: pointer;
        font-family: 'Jost', sans-serif;
        font-weight: 500;
        transition: all 0.2s;
        white-space: nowrap;
      }
      .cb-qr-btn:hover {
        background: var(--cb-gold);
        border-color: var(--cb-gold);
        color: white;
        transform: translateY(-1px);
      }

      /* Input area */
      .cb-input-area {
        padding: 10px 14px 14px;
        background: var(--cb-white);
        border-top: 1px solid rgba(201,169,110,0.15);
        display: flex;
        gap: 8px;
        align-items: center;
        flex-shrink: 0;
      }
      #chatbot-input {
        flex: 1;
        padding: 10px 14px;
        border: 1.5px solid rgba(201,169,110,0.3);
        border-radius: 24px;
        font-family: 'Jost', sans-serif;
        font-size: 0.875rem;
        color: var(--cb-dark);
        background: var(--cb-beige);
        outline: none;
        transition: border-color 0.2s;
      }
      #chatbot-input:focus { border-color: var(--cb-gold); background: white; }
      #chatbot-input::placeholder { color: #b09080; }

      #chatbot-send {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--cb-gold), var(--cb-gold-dark));
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 2px 8px rgba(201,169,110,0.35);
      }
      #chatbot-send:hover { transform: scale(1.08); box-shadow: 0 4px 16px rgba(201,169,110,0.5); }
      #chatbot-send svg  { width: 16px; height: 16px; fill: white; }

      .cb-footer-note {
        text-align: center;
        font-size: 0.65rem;
        color: rgba(44,36,32,0.35);
        padding: 0 14px 8px;
        flex-shrink: 0;
      }

      /* WA special button inside chat */
      .cb-wa-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: #25D366;
        color: white !important;
        padding: 8px 14px;
        border-radius: 20px;
        font-size: 0.82rem;
        font-weight: 600;
        margin-top: 8px;
        cursor: pointer;
        text-decoration: none !important;
        transition: background 0.2s;
        font-family: 'Jost', sans-serif;
        border: none;
      }
      .cb-wa-btn:hover { background: #1da554; }

      /* Animations */
      @keyframes cbPulse {
        0%,100% { box-shadow: 0 4px 24px rgba(201,169,110,0.5); }
        50%      { box-shadow: 0 4px 36px rgba(201,169,110,0.8), 0 0 0 10px rgba(201,169,110,0.1); }
      }
      @keyframes cbPulseGreen {
        0%,100% { opacity: 1; }
        50%      { opacity: 0.4; }
      }
      @keyframes typingDot {
        0%,60%,100% { transform: translateY(0); opacity: 0.4; }
        30%          { transform: translateY(-5px); opacity: 1; }
      }
      @keyframes msgAppear {
        from { opacity:0; transform:translateY(8px); }
        to   { opacity:1; transform:translateY(0); }
      }
      @keyframes badgePop {
        0%   { transform: scale(0); }
        70%  { transform: scale(1.2); }
        100% { transform: scale(1); }
      }

      @media (max-width: 420px) {
        #chatbot-window {
          width: calc(100vw - 20px);
          right: 10px;
          bottom: 84px;
          max-height: 75vh;
        }
        #chatbot-launcher { right: 16px; bottom: 16px; }
        #chatbot-hint { right: 16px; }
      }
    `;
    document.head.appendChild(style);
  }

  buildHTML() {
    // ── Floating launcher button ──
    const launcher = document.createElement('button');
    launcher.id = 'chatbot-launcher';
    launcher.setAttribute('aria-label', 'Abrir chat de ayuda');
    launcher.innerHTML = `
      <svg class="icon-chat" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
      </svg>
      <svg class="icon-close" viewBox="0 0 24 24">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
      <span id="chatbot-badge">1</span>
    `;

    // ── Hint bubble ──
    const hint = document.createElement('div');
    hint.id = 'chatbot-hint';
    hint.innerHTML = `¡Hola! 👋 ¿Tienes preguntas?<br><small style="color:#C9A96E;">Estoy aquí para ayudarte</small>`;
    hint.addEventListener('click', () => this.toggleChat());

    // ── Chat window ──
    const win = document.createElement('div');
    win.id = 'chatbot-window';
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-label', 'Chat de ayuda Beauty Salon');
    win.innerHTML = `
      <div class="cb-header">
        <img src="${CHATBOT_CONFIG.avatar}" alt="BeautyBot" class="cb-header-avatar" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 50 50%22%3E%3Ccircle cx=%2225%22 cy=%2225%22 r=%2225%22 fill=%22%23C9A96E%22/%3E%3Ctext x=%2250%25%22 y=%2255%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2220%22 fill=%22white%22%3E💅%3C/text%3E%3C/svg%3E'" />
        <div class="cb-header-info">
          <div class="cb-header-name">${CHATBOT_CONFIG.name}</div>
          <div class="cb-header-status"><span class="cb-status-dot"></span> En línea · Responde al instante</div>
        </div>
        <button class="cb-header-wa" onclick="window.open('https://wa.me/${CHATBOT_CONFIG.waNumber}','_blank')" title="Abrir WhatsApp">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          WhatsApp
        </button>
      </div>

      <div class="cb-messages" id="cb-messages"></div>
      <div class="cb-quick-replies" id="cb-quick-replies"></div>

      <div class="cb-input-area">
        <input type="text" id="chatbot-input" placeholder="Escribe tu pregunta..." maxlength="200" autocomplete="off" />
        <button id="chatbot-send" aria-label="Enviar">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
      <div class="cb-footer-note">Beauty Salon · +504 9530-7141</div>
    `;

    document.body.appendChild(launcher);
    document.body.appendChild(hint);
    document.body.appendChild(win);
    this.el = { launcher, hint, win };
  }

  attachEvents() {
    this.el.launcher.addEventListener('click', () => this.toggleChat());

    const input = document.getElementById('chatbot-input');
    const send  = document.getElementById('chatbot-send');

    send.addEventListener('click', () => this.handleUserInput());
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.handleUserInput(); }
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    this.el.launcher.classList.toggle('open', this.isOpen);
    document.getElementById('chatbot-window').classList.toggle('open', this.isOpen);
    this.hideHint();

    if (this.isOpen && this.messageCount === 0) {
      this.sendGreeting();
      // Remove badge
      const badge = document.getElementById('chatbot-badge');
      if (badge) badge.remove();
    }

    if (this.isOpen) {
      setTimeout(() => document.getElementById('chatbot-input').focus(), 350);
    }
  }

  hideHint() {
    const h = document.getElementById('chatbot-hint');
    if (h) { h.classList.remove('show'); }
  }

  showBubbleHint() {
    if (!this.isOpen) {
      const h = document.getElementById('chatbot-hint');
      if (h) {
        h.classList.add('show');
        setTimeout(() => h.classList.remove('show'), 6000);
      }
    }
  }

  sendGreeting() {
    this.addBotMessage(CHATBOT_CONFIG.greeting, CHATBOT_CONFIG.quickReplies);
  }

  handleUserInput() {
    const input = document.getElementById('chatbot-input');
    const text  = input.value.trim();
    if (!text || this.isTyping) return;

    input.value = '';
    this.clearQuickReplies();
    this.addUserMessage(text);
    this.showTyping();

    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      this.hideTyping();
      const result = findBestResponse(text);
      this.addBotMessage(result.response, result.quickReplies, result === FALLBACK);
    }, delay);
  }

  handleQuickReply(text) {
    this.clearQuickReplies();

    // Special actions
    if (text.includes('Formulario de citas') || text.includes('Ir al formulario')) {
      window.location.href = 'contacto.html';
      return;
    }
    if (text.includes('Ver catálogo') || text.includes('tienda')) {
      window.location.href = 'productos.html';
      return;
    }
    if (text.includes('Tabla de precios') || text.includes('precios completos')) {
      window.location.href = 'precios.html';
      return;
    }
    if (text.includes('WhatsApp') || text.includes('Escribir por WhatsApp') || text.includes('Hablar con estilista') || text.includes('Consultar con estilista')) {
      window.open(`https://wa.me/${CHATBOT_CONFIG.waNumber}`, '_blank');
      this.addUserMessage(text);
      setTimeout(() => this.addBotMessage('Te redirigiré a WhatsApp para que puedas hablar directamente con nuestra estilista. 💬✨', ['📅 Agendar cita','🛍️ Ver productos']), 500);
      return;
    }
    if (text.includes('Llamar')) {
      window.location.href = 'tel:+50495307141';
      return;
    }
    if (text.includes('Inicio')) {
      window.location.href = 'index.html';
      return;
    }

    this.addUserMessage(text);
    this.showTyping();
    const delay = 500 + Math.random() * 600;
    setTimeout(() => {
      this.hideTyping();
      const result = findBestResponse(text);
      this.addBotMessage(result.response, result.quickReplies, result === FALLBACK);
    }, delay);
  }

  addUserMessage(text) {
    this.messageCount++;
    const msgs = document.getElementById('cb-messages');
    const div  = document.createElement('div');
    div.className = 'cb-msg user';
    div.innerHTML = `
      <div>
        <div class="cb-bubble">${this.escapeHtml(text)}</div>
        <span class="cb-time">${this.getTime()}</span>
      </div>
    `;
    msgs.appendChild(div);
    this.scrollToBottom();
  }

  addBotMessage(text, quickReplies = [], isFallback = false) {
    this.messageCount++;
    const msgs = document.getElementById('cb-messages');
    const div  = document.createElement('div');
    div.className = 'cb-msg bot';

    let extra = '';
    if (isFallback) {
      extra = `
        <div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:6px;">
          <a href="https://wa.me/${CHATBOT_CONFIG.waNumber}" target="_blank" class="cb-wa-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Escribir a Estilista
          </a>
          <a href="tel:+50495307141" class="cb-wa-btn" style="background:#C9A96E;">
            📞 Llamar ahora
          </a>
        </div>
      `;
    }

    div.innerHTML = `
      <img src="${CHATBOT_CONFIG.avatar}" alt="Bot" class="cb-bot-avatar" onerror="this.style.display='none'" />
      <div>
        <div class="cb-bubble">${renderMarkdown(text)}${extra}</div>
        <span class="cb-time">${this.getTime()}</span>
      </div>
    `;
    msgs.appendChild(div);
    this.scrollToBottom();

    if (quickReplies && quickReplies.length) {
      this.renderQuickReplies(quickReplies);
    }
  }

  showTyping() {
    this.isTyping = true;
    const msgs = document.getElementById('cb-messages');
    const div  = document.createElement('div');
    div.className = 'cb-msg bot';
    div.id = 'cb-typing-indicator';
    div.innerHTML = `
      <img src="${CHATBOT_CONFIG.avatar}" alt="" class="cb-bot-avatar" onerror="this.style.display='none'" />
      <div class="cb-typing"><span></span><span></span><span></span></div>
    `;
    msgs.appendChild(div);
    this.scrollToBottom();
  }

  hideTyping() {
    this.isTyping = false;
    const t = document.getElementById('cb-typing-indicator');
    if (t) t.remove();
  }

  renderQuickReplies(replies) {
    const container = document.getElementById('cb-quick-replies');
    container.innerHTML = '';
    replies.forEach(reply => {
      const btn = document.createElement('button');
      btn.className = 'cb-qr-btn';
      btn.textContent = reply;
      btn.addEventListener('click', () => this.handleQuickReply(reply));
      container.appendChild(btn);
    });
  }

  clearQuickReplies() {
    const c = document.getElementById('cb-quick-replies');
    if (c) c.innerHTML = '';
  }

  scrollToBottom() {
    const msgs = document.getElementById('cb-messages');
    if (msgs) setTimeout(() => { msgs.scrollTop = msgs.scrollHeight; }, 50);
  }

  getTime() {
    return new Date().toLocaleTimeString('es-HN', { hour: '2-digit', minute: '2-digit' });
  }

  escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
}

// ─── BOOT ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  window._beautyChatbot = new BeautyChatbot();
});
