/**
 * BEAUTY SALON - WHATSAPP INTEGRATION
 * URL encoding and redirect helpers for appointments and products
 */

const WHATSAPP_NUMBER = '50495307141';

/**
 * Send appointment details via WhatsApp
 */
function sendAppointmentWhatsApp({ nombre, apellido, telefono, servicio, fecha, hora }) {
  const message = `Hola, tengo una nueva cita:

👤 Nombre: ${nombre} ${apellido}
📞 Teléfono: ${telefono}
💅 Servicio: ${servicio}
📅 Fecha: ${fecha}
🕐 Hora: ${hora}

Por favor confirma esta cita o sugiere otro horario disponible.`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

/**
 * Reserve a product via WhatsApp
 * Called from the product modal form
 */
function reserveProductWhatsApp({ nombre_producto, precio, nombre_cliente, telefono_cliente }) {
  const message = `Hola, quiero reservar el siguiente producto:

🛍️ Producto: ${nombre_producto}
💰 Precio: ${precio}
👤 Mi nombre: ${nombre_cliente}
📞 Teléfono: ${telefono_cliente}`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

/**
 * Quick WhatsApp contact (floating button, general inquiry)
 */
function openWhatsApp(customMessage) {
  const message = customMessage || '¡Hola! Me gustaría obtener más información sobre sus servicios. 😊';
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// Attach to floating WhatsApp button
document.addEventListener('DOMContentLoaded', () => {
  const floatBtn = document.querySelector('.whatsapp-float');
  if (floatBtn) {
    floatBtn.addEventListener('click', () => openWhatsApp());
  }
});
