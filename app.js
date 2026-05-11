const svg = document.querySelector("svg");
const player = document.getElementById("player1");

let dragging = false;

function getPoint(clientX, clientY) {
  const point = svg.createSVGPoint();
  point.x = clientX;
  point.y = clientY;
  return point.matrixTransform(svg.getScreenCTM().inverse());
}

function movePlayer(clientX, clientY) {
  const p = getPoint(clientX, clientY);
  player.setAttribute("cx", p.x);
  player.setAttribute("cy", p.y);
}

// Start drag
player.addEventListener("touchstart", (e) => {
  e.preventDefault();
  dragging = true;
}, { passive: false });

player.addEventListener("mousedown", (e) => {
  e.preventDefault();
  dragging = true;
});

// Move
svg.addEventListener("touchmove", (e) => {
  if (!dragging) return;
  e.preventDefault();

  const touch = e.touches[0];
  movePlayer(touch.clientX, touch.clientY);
}, { passive: false });

svg.addEventListener("mousemove", (e) => {
  if (!dragging) return;
  movePlayer(e.clientX, e.clientY);
});

// Stop drag
svg.addEventListener("touchend", () => {
  dragging = false;
});

svg.addEventListener("mouseup", () => {
  dragging = false;
});
