const svg = document.querySelector("svg");

const addBlueButton = document.getElementById("addBlue");
const addRedButton = document.getElementById("addRed");
const addConeButton = document.getElementById("addCone");

let selected = null;

function getPoint(clientX, clientY) {
  const point = svg.createSVGPoint();
  point.x = clientX;
  point.y = clientY;
  return point.matrixTransform(svg.getScreenCTM().inverse());
}

function makeDraggable(element) {
  element.addEventListener("touchstart", (e) => {
    e.preventDefault();
    selected = element;
  }, { passive: false });

  element.addEventListener("mousedown", (e) => {
    e.preventDefault();
    selected = element;
  });
}

function moveElement(element, x, y) {
  if (element.tagName === "circle") {
    element.setAttribute("cx", x);
    element.setAttribute("cy", y);
  }

  if (element.tagName === "polygon") {
    const size = 0.55;
    const points = `
      ${x},${y - size}
      ${x - size},${y + size}
      ${x + size},${y + size}
    `;
    element.setAttribute("points", points);
  }
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

svg.addEventListener("touchmove", (e) => {
  if (!selected) return;
  e.preventDefault();

  const touch = e.touches[0];
  const p = getPoint(touch.clientX, touch.clientY);

  moveElement(selected, p.x, p.y);
}, { passive: false });

svg.addEventListener("mousemove", (e) => {
  if (!selected) return;

  const p = getPoint(e.clientX, e.clientY);
  moveElement(selected, p.x, p.y);
});

svg.addEventListener("touchend", () => {
  selected = null;
});

svg.addEventListener("mouseup", () => {
  selected = null;
});

addBlueButton.addEventListener("click", () => addPlayer("blue"));
addRedButton.addEventListener("click", () => addPlayer("red"));
addConeButton.addEventListener("click", addCone);
