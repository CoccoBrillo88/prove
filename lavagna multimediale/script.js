// --- CONFIGURAZIONE ---
const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const workspace = document.getElementById('workspace');
const textInput = document.getElementById('text-input-overlay');

// Stato
let isDrawing = false;
let currentTool = 'pen';
let currentColor = '#000000';
let currentLineWidth = 3;
let currentLineStyle = 'solid';
let startX, startY;
let snapshot;

// Cronologia
let history = [];
let historyStep = -1;
const MAX_HISTORY = 50; // Limite per performance

// --- UTILITIES UI ---
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').innerText = message;
    toast.classList.remove('opacity-0', 'translate-y-4');
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-4');
    }, 3000);
}

// --- FUNZIONI PRINCIPALI ---
// (Inserire il resto del codice JS qui... Non è cambiato rispetto al tuo originale)

