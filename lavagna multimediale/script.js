const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 64;
}
resize();
window.addEventListener("resize", resize);

let tool = "pen";
let drawing = false;
let startX, startY;
let history = [];
let redoStack = [];

const color = document.getElementById("color");
const size = document.getElementById("size");
const lineStyle = document.getElementById("lineStyle");

// Toolbar
document.querySelectorAll("[data-tool]").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll("[data-tool]").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    tool = btn.dataset.tool;
  };
});

function saveState() {
  history.push(canvas.toDataURL());
  redoStack = [];
}

canvas.addEventListener("mousedown", e => {
  startX = e.offsetX;
  startY = e.offsetY;

  if (tool === "text") {
    const text = prompt("Scrivi il testo");
    if (text) {
      saveState();
      ctx.fillStyle = color.value;
      ctx.font = `${size.value * 4}px Arial`;
      ctx.fillText(text, startX, startY);
    }
    return;
  }

  drawing = true;
  saveState();
  ctx.beginPath();
  ctx.moveTo(startX, startY);
});

canvas.addEventListener("mousemove", e => {
  if (!drawing) return;

  ctx.strokeStyle = color.value;
  ctx.lineWidth = size.value;
  ctx.lineCap = "round";

  if (lineStyle.value === "dashed") ctx.setLineDash([10, 6]);
  else if (lineStyle.value === "dotted") ctx.setLineDash([2, 6]);
  else ctx.setLineDash([]);

  if (tool === "pen" || tool === "highlighter") {
    ctx.globalAlpha = tool === "highlighter" ? 0.3 : 1;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }

  if (tool === "eraser") {
    ctx.clearRect(e.offsetX - size.value, e.offsetY - size.value, size.value * 2, size.value * 2);
  }
});

canvas.addEventListener("mouseup", e => {
  if (!drawing) return;
  drawing = false;

  if (tool === "line") {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }

  ctx.globalAlpha = 1;
  ctx.setLineDash([]);
});

// Undo / Redo
document.getElementById("undo").onclick = () => {
  if (history.length === 0) return;
  redoStack.push(history.pop());
  const img = new Image();
  img.src = history[history.length - 1] || "";
  img.onload = () => ctx.drawImage(img, 0, 0);
};

document.getElementById("redo").onclick = () => {
  if (redoStack.length === 0) return;
  const data = redoStack.pop();
  history.push(data);
  const img = new Image();
  img.src = data;
  img.onload = () => ctx.drawImage(img, 0, 0);
};

// Export
function exportImg(type, name) {
  const a = document.createElement("a");
  a.href = canvas.toDataURL(type);
  a.download = name;
  a.click();
}

document.getElementById("png").onclick = () => exportImg("image/png", "lavagna.png");
document.getElementById("jpg").onclick = () => exportImg("image/jpeg", "lavagna.jpg");
document.getElementById("pdf").onclick = () => {
  const img = canvas.toDataURL("image/png");
  const w = window.open("");
  w.document.write(`<img src="${img}" style="width:100%">`);
  w.print();
};

// Save & Load
document.getElementById("save").onclick = () => {
  localStorage.setItem("lavagna", canvas.toDataURL());
  alert("Lavagna salvata");
};

window.onload = () => {
  const data = localStorage.getItem("lavagna");
  if (data) {
    const img = new Image();
    img.src = data;
    img.onload = () => ctx.drawImage(img, 0, 0);
  }
};
