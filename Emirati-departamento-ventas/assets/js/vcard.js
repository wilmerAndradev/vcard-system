// ========================================
// DATOS DE LA PERSONA (ALMA) CON DOS EMPRESAS
// ========================================
const personData = {
    name: "Departamento de Ventas",
    title: "Contacto",
    company: "Emirati Perfumes",
    phone: "+5491178572200",           
    phoneDisplay: "+549 11 7857 2200", 
    email: "asistenteperfumesavenue@gmail.com",
    locations: "Lavalle 676, Microcentro, Capital federal, Argentina",
    profileImage: "./assets/images/profile-alma.jpg",
    
  // REDES SOCIALES POR EMPRESA
    socialMedia: {
        emirati: {
            instagram: "https://www.instagram.com/emiratiperfumesok/",
            facebook: "https://www.facebook.com/emiratiperfumesok",
            tiktok: "https://www.tiktok.com/@emiratiperfumesok",
        },
        
    }
};


// ========================================
// FUNCIONES PRINCIPALES
// ========================================

/**
 * Función que se ejecuta cuando la página termina de cargar
 * Aquí inicializamos todo
 */
function initializeVCard() {
    console.log("🚀 Inicializando vCard...");
    
    // 1. Manejar el preloader
    handlePreloader();
    
    // 2. Configurar todos los enlaces y botones
    setupActionButtons();
    
    // 3. Configurar redes sociales CON PESTAÑAS
    setupSocialTabs();
    
    // 4. Configurar botón de añadir contacto
    setupAddContactButton();
    
    console.log("✅ vCard inicializada correctamente");
}

/**
 * Maneja la pantalla de precarga
 * La muestra por 1 segundo y luego muestra la vCard
 */
function handlePreloader() {
    const preloader = document.getElementById('preloader');
    const vcard = document.getElementById('vcard-container');
    
    // Después de 1 segundo (1000ms)
    setTimeout(() => {
        // Ocultar preloader con animación
        preloader.classList.add('hidden');
        
        // Mostrar vCard con animación
        vcard.classList.remove('hidden');
        vcard.style.animation = 'slideInUp 0.6s ease-out';
        
        console.log("✅ Preloader terminado, vCard mostrada");
    }, 1000);
}

/**
 * Configura los botones principales (teléfono y email)
 */
function setupActionButtons() {
    // Botón de teléfono/WhatsApp
    const phoneBtn = document.getElementById('phone-btn');
    if (phoneBtn) {
        // URL de WhatsApp con el número
        phoneBtn.href = `https://wa.me/${personData.phone}`;
        console.log("✅ Botón WhatsApp configurado:", phoneBtn.href);
    }
    
    // Botón de email
    const emailBtn = document.getElementById('email-btn');
    if (emailBtn) {
        // URL de mailto con el email
        emailBtn.href = `mailto:${personData.email}`;
        console.log("✅ Botón Email configurado:", emailBtn.href);
    }
}

/**
 * NUEVA FUNCIÓN: Configura las pestañas y redes sociales
 */
/**
 * Configura las redes sociales (solo Emirati Perfumes)
 */
function setupSocialTabs() {
    // Configurar redes sociales de EMIRATI PERFUMES
    const socialData = personData.socialMedia.emirati;
    
    // Instagram
    const instagramBtn = document.querySelector('.emirati-instagram');
    if (instagramBtn && socialData.instagram) {
        instagramBtn.href = socialData.instagram;
        console.log('✅ Instagram configurado:', socialData.instagram);
    }
    
    // Facebook
    const facebookBtn = document.querySelector('.emirati-facebook');
    if (facebookBtn && socialData.facebook) {
        facebookBtn.href = socialData.facebook;
        console.log('✅ Facebook configurado:', socialData.facebook);
    }
    
    // TikTok
    const tiktokBtn = document.querySelector('.emirati-tiktok');
    if (tiktokBtn && socialData.tiktok) {
        tiktokBtn.href = socialData.tiktok;
        console.log('✅ TikTok configurado:', socialData.tiktok);
    }
    
    console.log("✅ Redes sociales configuradas");
}

/**
 * Configura el botón de "Añadir contacto"
 * Crea un archivo vCard que el usuario puede descargar
 */
function setupAddContactButton() {
    const addContactBtn = document.getElementById('add-contact-btn');
    
    if (addContactBtn) {
        addContactBtn.addEventListener('click', function() {
            console.log("📞 Usuario quiere añadir contacto...");
            
            // Crear el contenido del archivo vCard
            const vCardData = createVCardData();
            
            // Crear el archivo y descargarlo
            downloadVCard(vCardData);
        });
    }
}

/**
 * Crea el contenido del archivo vCard (.vcf)
 * Este es el formato estándar que entienden todos los teléfonos
 */
function createVCardData() {
     // Separar nombre completo en partes
    const nameParts = personData.name.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    // Formato vCard 3.0 (estándar universal)
    const vCard = [
        "BEGIN:VCARD",                                    // Inicio del vCard
        "VERSION:3.0",                                   // Versión
        `FN:${personData.name}`,                        // Nombre completo para mostrar
        `N:${lastName};${firstName};;;`,                 // NUEVO: Estructura N requerida por iOS
        `ORG:${personData.company}`,                     // Organización
        `TITLE:${personData.title}`,                     // Cargo
        `TEL;TYPE=CELL:${personData.phoneDisplay}`,      // Teléfono móvil
        `EMAIL:${personData.email}`,                     // Email
        `URL:${personData.socialMedia.emirati.instagram}`, // Sitio web (Instagram principal)
        `NOTE:Ubicaciones: ${personData.locations}`,     // Nota con ubicaciones
        "END:VCARD"                                      // Fin del vCard
    ].join('\r\n'); // Unir con saltos de línea
    
    console.log("📝 vCard creado:", vCard);
    return vCard;
}

/**
 * Descarga el archivo vCard
 * Crea un enlace de descarga temporal y lo activa
 */
function downloadVCard(vCardData) {
    try {
        // Crear un "blob" (archivo en memoria) con los datos
        const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
        
        // Crear una URL temporal para el archivo
        const url = window.URL.createObjectURL(blob);
        
        // Crear un enlace de descarga invisible
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = `${personData.name.replace(/\s+/g, '_')}_contacto.vcf`; // Nombre del archivo
        
        // Agregar el enlace al documento (invisible)
        document.body.appendChild(downloadLink);
        
        // Hacer clic automáticamente para descargar
        downloadLink.click();
        
        // Limpiar: remover el enlace y la URL temporal
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(url);
        
        console.log("✅ Descarga de contacto iniciada");
        
        // Mostrar mensaje de éxito al usuario
        showSuccessMessage();
        
    } catch (error) {
        console.error("❌ Error al descargar contacto:", error);
        alert("Hubo un error al generar el contacto. Por favor, intenta de nuevo.");
    }
}

/**
 * Muestra un mensaje de éxito cuando se descarga el contacto
 */
function showSuccessMessage() {
    // Crear un mensaje temporal
    const message = document.createElement('div');
    message.textContent = '✅ ¡Contacto descargado! Revisa tu carpeta de descargas.';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-family: 'Montserrat', sans-serif;
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Agregar al documento
    document.body.appendChild(message);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        message.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (message.parentNode) {
                document.body.removeChild(message);
            }
        }, 300);
    }, 3000);
}

/**
 * Maneja errores de carga de imágenes
 * Si una imagen no carga, pone un placeholder
 */
function handleImageErrors() {
    const profileImg = document.getElementById('profile-image');
    
    if (profileImg) {
        profileImg.onerror = function() {
            console.log("⚠️ Error cargando imagen de perfil, usando placeholder");
            // Imagen placeholder si la original falla
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjQ0E4MTgxIi8+Cjx0ZXh0IHg9IjYwIiB5PSI2MCIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9IjAuMzVlbSI+QTwvdGV4dD4KPHN2Zz4K';
        };
    }
}

// ========================================
// ANIMACIONES CSS ADICIONALES
// ========================================

// Agregar estilos para las animaciones de los mensajes
const additionalStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

// Agregar los estilos al documento
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ========================================
// INICIALIZACIÓN
// ========================================

/**
 * Event Listener: Se ejecuta cuando el HTML termina de cargar
 * Es como el "botón de encendido" de nuestra vCard
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log("🌟 HTML cargado, iniciando vCard...");
    
    // Manejar errores de imágenes
    handleImageErrors();
    
    // Inicializar toda la funcionalidad
    initializeVCard();
});

// ========================================
// DEBUG: Funciones para desarrollo
// ========================================

// Solo para desarrollo - puedes remover esto después
window.vCardDebug = {
    data: personData,
    testWhatsApp: () => window.open(`https://wa.me/${personData.phone}`, '_blank'),
    testEmail: () => window.open(`mailto:${personData.email}`, '_blank'),
    testDownload: () => {
        const vCardData = createVCardData();
        downloadVCard(vCardData);
    }
};