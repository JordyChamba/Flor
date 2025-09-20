// Variables globales
let currentPage = 0;
const pages = ["welcome-page", "poem-page", "flowers-page"];
let flowers = [];
let sparkles = [];
let windDirection = 1;

// Inicialización cuando se carga la página
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById(pages[currentPage]).classList.add("active"); // 👈 mostrar la inicial
  initializeWelcomePage();
  createInitialFlowers();
  createSparkles();
});

// ===== NAVEGACIÓN ENTRE PÁGINAS =====
function nextPage() {
  const currentPageElement = document.getElementById(pages[currentPage]);
  currentPageElement.classList.remove("active");

  currentPage = (currentPage + 1) % pages.length;
  const nextPageElement = document.getElementById(pages[currentPage]);

  setTimeout(() => {
    nextPageElement.classList.add("active");

    // Inicializar efectos específicos de cada página
    if (currentPage === 1) {
      initializePoemPage();
    } else if (currentPage === 2) {
      initializeFlowersPage();
    }
  }, 500);
}

// ===== PÁGINA DE BIENVENIDA =====
function initializeWelcomePage() {
  // Crear pétalos flotantes adicionales
  createFloatingPetals();

  // Efecto de escritura para el título
  typeWriterEffect();
}

function createFloatingPetals() {
  const container = document.querySelector(".floating-petals");

  for (let i = 0; i < 8; i++) {
    const petal = document.createElement("div");
    petal.className = "floating-petal";
    petal.style.cssText = `
            position: absolute;
            width: ${Math.random() * 15 + 10}px;
            height: ${Math.random() * 15 + 10}px;
            background: radial-gradient(circle, #ffd700 0%, #ffed4e 50%, transparent 70%);
            border-radius: 50% 0 50% 0;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 4 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
    container.appendChild(petal);
  }
}

function typeWriterEffect() {
  const title = document.querySelector(".main-title");
  const text = title.textContent;
  title.textContent = "";

  let i = 0;
  const typeInterval = setInterval(() => {
    title.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(typeInterval);
    }
  }, 150);
}

// ===== PÁGINA DEL POEMA =====
function initializePoemPage() {
  // Crear pétalos cayendo
  createFallingPetals();

  // Efecto de resaltado en las líneas del poema
  highlightPoemLines();
}

function createFallingPetals() {
  const container = document.querySelector(".falling-petals");

  for (let i = 0; i < 12; i++) {
    const petal = document.createElement("div");
    petal.className = "falling-petal";
    petal.style.cssText = `
            position: absolute;
            width: ${Math.random() * 12 + 8}px;
            height: ${Math.random() * 12 + 8}px;
            background: radial-gradient(circle, #ffd700 0%, #ffed4e 50%, transparent 70%);
            border-radius: 50% 0 50% 0;
            left: ${Math.random() * 100}%;
            top: -20px;
            animation: fall ${Math.random() * 3 + 6}s linear infinite;
            animation-delay: ${Math.random() * 3}s;
        `;
    container.appendChild(petal);
  }
}

function highlightPoemLines() {
  const lines = document.querySelectorAll(".poem-line");

  lines.forEach((line, index) => {
    line.addEventListener("mouseenter", () => {
      line.style.textShadow = "0 0 15px rgba(255, 215, 0, 0.8)";
      line.style.transform = "translateX(10px)";
      line.style.transition = "all 0.3s ease";
    });

    line.addEventListener("mouseleave", () => {
      line.style.textShadow = "none";
      line.style.transform = "translateX(0)";
    });
  });
}

// ===== PÁGINA DE FLORES ANIMADAS =====
function initializeFlowersPage() {
  // Crear flores iniciales
  createInitialFlowers();

  // Crear chispas
  createSparkles();

  // Iniciar animaciones
  startFlowerAnimations();
}

function createInitialFlowers() {
  const container = document.querySelector(".animated-flowers");
  flowers = [];

  for (let i = 0; i < 15; i++) {
    createFlower(container);
  }
}

function createFlower(container) {
  const flower = document.createElement("div");
  flower.className = "flower";

  const x = Math.random() * (window.innerWidth - 40);
  const y = Math.random() * (window.innerHeight - 40);

  flower.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${Math.random() * 30 + 20}px;
        height: ${Math.random() * 30 + 20}px;
        animation: flowerGrow ${Math.random() * 2 + 2}s ease-out forwards;
        animation-delay: ${Math.random() * 2}s;
    `;

  // Crear pétalos
  const petalCount = Math.floor(Math.random() * 4) + 5;
  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement("div");
    petal.className = "petal";
    petal.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, #ffd700 0%, #ffed4e 50%, #ffa500 100%);
            border-radius: 50% 0 50% 0;
            transform: rotate(${i * (360 / petalCount)}deg);
            transform-origin: center;
            animation: petalRotate ${
              Math.random() * 3 + 2
            }s ease-in-out infinite;
            animation-delay: ${Math.random() * 1}s;
        `;
    flower.appendChild(petal);
  }

  // Centro de la flor
  const center = document.createElement("div");
  center.className = "flower-center";
  center.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 8px;
        height: 8px;
        background: #8b4513;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
    `;
  flower.appendChild(center);

  container.appendChild(flower);
  flowers.push(flower);
}

function createSparkles() {
  const container = document.querySelector(".sparkles");
  sparkles = [];

  for (let i = 0; i < 20; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";

    sparkle.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: #fff;
            border-radius: 50%;
            animation: sparkleFloat ${
              Math.random() * 2 + 2
            }s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;

    container.appendChild(sparkle);
    sparkles.push(sparkle);
  }
}

function startFlowerAnimations() {
  // Animación de viento suave
  setInterval(() => {
    flowers.forEach((flower) => {
      const currentTransform = flower.style.transform || "";
      const swayAmount = Math.sin(Date.now() * 0.001) * 5 * windDirection;
      flower.style.transform = `translateX(${swayAmount}px) rotate(${
        swayAmount * 0.5
      }deg)`;
    });
  }, 50);
}

// ===== CONTROLES INTERACTIVOS =====
function changeWind() {
  windDirection *= -1;

  // Efecto visual de cambio de viento
  const flowersContainer = document.querySelector(".animated-flowers");
  flowersContainer.style.animation = "none";
  setTimeout(() => {
    flowersContainer.style.animation = "windChange 0.5s ease-in-out";
  }, 10);

  // Crear efecto de viento
  createWindEffect();
}

function createWindEffect() {
  const container = document.querySelector(".animated-flowers");

  for (let i = 0; i < 5; i++) {
    const windPetal = document.createElement("div");
    windPetal.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, #ffd700 0%, transparent 70%);
            border-radius: 50% 0 50% 0;
            left: ${windDirection > 0 ? "-20px" : "100%"};
            top: ${Math.random() * 100}%;
            animation: windBlow 2s linear forwards;
        `;

    container.appendChild(windPetal);

    setTimeout(() => {
      windPetal.remove();
    }, 2000);
  }
}

function addFlowers() {
  const container = document.querySelector(".animated-flowers");

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      createFlower(container);
    }, i * 200);
  }

  // Efecto de celebración
  createCelebrationEffect();
}

function createCelebrationEffect() {
  const container = document.querySelector(".animated-flowers");

  for (let i = 0; i < 10; i++) {
    const confetti = document.createElement("div");
    confetti.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: #ffd700;
            left: ${Math.random() * 100}%;
            top: 0;
            animation: confettiFall 3s ease-out forwards;
            animation-delay: ${Math.random() * 0.5}s;
        `;

    container.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }
}

function resetGarden() {
  const container = document.querySelector(".animated-flowers");
  container.innerHTML = "";
  flowers = [];

  // Efecto de desvanecimiento
  container.style.opacity = "0";
  setTimeout(() => {
    createInitialFlowers();
    container.style.opacity = "1";
  }, 500);
}

// ===== EFECTOS ADICIONALES =====
function createRainbowEffect() {
  const colors = [
    "#ff0000",
    "#ff8000",
    "#ffff00",
    "#80ff00",
    "#00ff00",
    "#00ff80",
    "#00ffff",
    "#0080ff",
    "#0000ff",
    "#8000ff",
    "#ff00ff",
    "#ff0080",
  ];

  flowers.forEach((flower, index) => {
    const color = colors[index % colors.length];
    flower.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
  });
}

// ===== ANIMACIONES CSS ADICIONALES =====
const additionalStyles = `
    @keyframes windChange {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes windBlow {
        0% { 
            left: ${windDirection > 0 ? "-20px" : "100%"};
            opacity: 1;
        }
        100% { 
            left: ${windDirection > 0 ? "100%" : "-20px"};
            opacity: 0;
        }
    }
    
    @keyframes confettiFall {
        0% { 
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% { 
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes petalRotate {
        0%, 100% { transform: rotate(var(--rotation, 0deg)) scale(1); }
        50% { transform: rotate(var(--rotation, 0deg)) scale(1.1); }
    }
    
    .flower:hover {
        transform: scale(1.2) !important;
        transition: transform 0.3s ease;
    }
    
    .flower:hover .petal {
        animation-duration: 0.5s !important;
    }
`;

// Agregar estilos adicionales al documento
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ===== EFECTOS DE SONIDO VISUALES =====
function createVisualSound() {
  const container = document.querySelector(".animated-flowers");

  const soundWave = document.createElement("div");
  soundWave.style.cssText = `
        position: absolute;
        width: 200px;
        height: 200px;
        border: 2px solid rgba(255, 215, 0, 0.5);
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        animation: soundWave 2s ease-out forwards;
        pointer-events: none;
    `;

  container.appendChild(soundWave);

  setTimeout(() => {
    soundWave.remove();
  }, 2000);
}

// Agregar animación de onda de sonido
const soundWaveStyle = `
    @keyframes soundWave {
        0% { 
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% { 
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
        }
    }
`;

const soundStyleSheet = document.createElement("style");
soundStyleSheet.textContent = soundWaveStyle;
document.head.appendChild(soundStyleSheet);

// ===== INTERACTIVIDAD AVANZADA =====
document.addEventListener("click", function (e) {
  if (currentPage === 2) {
    // Solo en la página de flores
    createClickEffect(e.clientX, e.clientY);
  }
});

function createClickEffect(x, y) {
  const container = document.querySelector(".animated-flowers");

  for (let i = 0; i < 8; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #ffd700;
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            animation: clickExplosion 1s ease-out forwards;
            animation-delay: ${i * 0.1}s;
        `;

    container.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1000);
  }
}

// Agregar animación de explosión de clic
const clickExplosionStyle = `
    @keyframes clickExplosion {
        0% { 
            transform: scale(0) translate(0, 0);
            opacity: 1;
        }
        100% { 
            transform: scale(1) translate(${Math.random() * 200 - 100}px, ${
  Math.random() * 200 - 100
}px);
            opacity: 0;
        }
    }
`;

const clickStyleSheet = document.createElement("style");
clickStyleSheet.textContent = clickExplosionStyle;
document.head.appendChild(clickStyleSheet);

// ===== EFECTOS DE RESPONSIVIDAD =====
window.addEventListener("resize", function () {
  if (currentPage === 2) {
    // Reajustar flores en redimensionamiento
    flowers.forEach((flower) => {
      const rect = flower.getBoundingClientRect();
      if (rect.right > window.innerWidth || rect.bottom > window.innerHeight) {
        flower.style.left = Math.random() * (window.innerWidth - 40) + "px";
        flower.style.top = Math.random() * (window.innerHeight - 40) + "px";
      }
    });
  }
});

console.log("🌸 Flores Amarillas - Experiencia Poética Cargada 🌸");
