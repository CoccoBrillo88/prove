// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// Impostazioni iniziali
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 150;
let drawing = false;
let currentPath = [];
let history = [];
let penColor = "#000000";
let highlightColor = "#FFFF00";
let penWidth = 2;
let isEraser = false;
let currentText = "";
let lineStyle = "solid";

// Gestione disegno su canvas
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    currentPath = [{ x: e.clientX, y: e.clientY }];
});

canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    currentPath.push({ x: e.clientX, y: e.clientY });
    redraw();
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    if (currentPath.length > 1) {
        history.push(currentPath);
        currentPath = [];
        saveDrawing();
    }
});

// Funzione per ridisegnare
function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    history.forEach(path => {
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        path.forEach(point => {
            ctx.lineTo(point.x, point.y);
        });
        ctx.strokeStyle = isEraser ? "#FFFFFF" : penColor;
        ctx.lineWidth = isEraser ? 10 : penWidth;
        ctx.setLineDash(lineStyle === "dashed" ? [5, 5] : lineStyle === "dotted" ? [1, 5] : []);
        ctx.stroke();
    });
    if (currentPath.length > 1) {
        ctx.beginPath();
        ctx.moveTo(currentPath[0].x, currentPath[0].y);
        currentPath.forEach(point => {
            ctx.lineTo(point.x, point.y);
        });
        ctx.strokeStyle = isEraser ? "#FFFFFF" : penColor;
        ctx.lineWidth = isEraser ? 10 : penWidth;
        ctx.setLineDash(lineStyle === "dashed" ? [5, 5] : lineStyle === "dotted" ? [1, 5] : []);
        ctx.stroke();
    }
}

// Funzione per scrivere testo sulla lavagna
document.getElementById('text').addEventListener('click', () => {
    const text = prompt("Scrivi il testo da inserire:", "");
    if (text) {
        ctx.fillStyle = penColor;
        ctx.font = `${penWidth * 10}px Arial`;
        ctx.fillText(text, 100, 100);
        saveDrawing();
    }
});

// Funzione per pulire la lavagna
document.getElementById('clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    history = [];
    saveDrawing();
});

// Funzione per annullare l'ultimo disegno
document.getElementById('undo').addEventListener('click', () => {
    history.pop();
    redraw();
    saveDrawing();
});

// Cambio colore penna
document.getElementById('penColor').addEventListener('click', () => {
    penColor = prompt("Inserisci il colore della penna (es. #FF0000):", penColor);
});

// Cambio colore evidenziatore
document.getElementById('highlightColor').addEventListener('click', () => {
    highlightColor = prompt("Inserisci il colore dell'evidenziatore (es. #FFFF00):", highlightColor);
});

// Attivazione gomma
document.getElementById('eraser').addEventListener('click', () => {
    isEraser = !isEraser;
});

// Modifica dello spessore della penna
document.getElementById('penWidth').addEventListener('input', (e) => {
    penWidth = e.target.value;
});

// Selezione dello stile della linea
document.getElementById('lineStyle').addEventListener('click', () => {
    const style = prompt("Scegli lo stile della linea (solid, dashed, dotted):", "solid");
    lineStyle = style;
});

// Salvataggio disegno
document.getElementById('save').addEventListener('click', () => {
    const dataURL = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'lavagna.png';
    link.click();
});

// Esportazione immagine
document.getElementById('export').addEventListener('click', () => {
    const dataURL = canvas.toDataURL("image/jpeg", 1.0);
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'lavagna.jpg';
    link.click();
});

// Caricamento file immagine
document.getElementById('loadFile').addEventListener('click', () => {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
