const svg = document.querySelector("svg");

const addBlueButton = document.getElementById("addBlue");
const addRedButton = document.getElementById("addRed");
const addConeButton = document.getElementById("addCone");
const addBallButton = document.getElementById("addBall");
const drawPassButton = document.getElementById("drawPass");

let selected = null;
let currentTool = "move";
let drawingLine = null;

function getPoint(clientX, clientY) {
  const point = svg.createSVGPoint();
  point.x = clientX;
  point.y = clientY;
  return point.matrixTransform(svg.getScreenCTM().inverse());
}

function moveElement(element, x, y) {
  if (element.tagName === "circle") {
    element.setAttribute("cx", x);
    element.setAttribute("cy", y);
  }
if (element.tagName === "g") {
  element.setAttribute("transform", `translate(${x} ${y})`);
}
  if (element.tagName === "polygon" && element.classList.contains("cone")) {
    const size = 0.32;
    element.setAttribute(
      "points",
      `${x},${y - size} ${x - size * 0.7},${y + size} ${x + size * 0.7},${y + size}`
    );
  }
}

function makeDraggable(element) {
  element.addEventListener("touchstart", (e) => {
    if (currentTool !== "move") return;
    e.preventDefault();
    selected = element;
  }, { passive: false });

  element.addEventListener("mousedown", (e) => {
    if (currentTool !== "move") return;
    e.preventDefault();
    selected = element;
  });
}

function addPlayer(type) {
  const player = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  player.setAttribute("cx", 10);
  player.setAttribute("cy", 15);
  player.setAttribute("r", 0.45);
  player.setAttribute("class", type === "blue" ? "player-blue" : "player-red");
  svg.appendChild(player);
  makeDraggable(player);
}

function addCone() {
  const cone = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  cone.setAttribute("class", "cone");
  moveElement(cone, 10, 15);
  svg.appendChild(cone);
  makeDraggable(cone);
}


  return points.join(" ");
}
function addBall() {
  const ball = document.createElementNS("http://www.w3.org/2000/svg", "circle");

  ball.setAttribute("cx", 10);
  ball.setAttribute("cy", 15);
  ball.setAttribute("r", 0.28);
  ball.setAttribute("fill", "white");
  ball.setAttribute("stroke", "#111");
  ball.setAttribute("stroke-width", 0.04);

  svg.appendChild(ball);
  makeDraggable(ball);
}

function startPassLine(x, y) {
  drawingLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
  drawingLine.setAttribute("x1", x);
  drawingLine.setAttribute("y1", y);
  drawingLine.setAttribute("x2", x);
  drawingLine.setAttribute("y2", y);
  drawingLine.setAttribute("class", "pass-line");
  svg.appendChild(drawingLine);
}

function updatePassLine(x, y) {
  if (!drawingLine) return;
  drawingLine.setAttribute("x2", x);
  drawingLine.setAttribute("y2", y);
}

function finishPassLine() {
  drawingLine = null;
  currentTool = "move";
}

svg.addEventListener("touchstart", (e) => {
  if (currentTool !== "pass") return;
  e.preventDefault();

  const touch = e.touches[0];
  const p = getPoint(touch.clientX, touch.clientY);
  startPassLine(p.x, p.y);
}, { passive: false });

svg.addEventListener("mousedown", (e) => {
  if (currentTool !== "pass") return;
  e.preventDefault();

  const p = getPoint(e.clientX, e.clientY);
  startPassLine(p.x, p.y);
});

svg.addEventListener("touchmove", (e) => {
  e.preventDefault();

  const touch = e.touches[0];
  const p = getPoint(touch.clientX, touch.clientY);

  if (drawingLine) {
    updatePassLine(p.x, p.y);
    return;
  }

  if (selected) {
    moveElement(selected, p.x, p.y);
  }
}, { passive: false });

svg.addEventListener("mousemove", (e) => {
  const p = getPoint(e.clientX, e.clientY);

  if (drawingLine) {
    updatePassLine(p.x, p.y);
    return;
  }

  if (selected) {
    moveElement(selected, p.x, p.y);
  }
  
});

svg.addEventListener("touchend", () => {
  if (drawingLine) finishPassLine();
  selected = null;
});

svg.addEventListener("mouseup", () => {
  if (drawingLine) finishPassLine();
  selected = null;
});

addBlueButton.addEventListener("click", () => addPlayer("blue"));
addRedButton.addEventListener("click", () => addPlayer("red"));
addConeButton.addEventListener("click", addCone);
addBallButton.addEventListener("click", addBall);

drawPassButton.addEventListener("click", () => {
  currentTool = "pass";
});
