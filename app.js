const svg = document.querySelector("svg");
const player = document.querySelector(".player-blue");

let selectedElement = null;

function getSvgPoint(event) {
  const point = svg.createSVGPoint();

  point.x = event.clientX;
  point.y = event.clientY;

  return point.matrixTransform(svg.getScreenCTM().inverse());
}

player.addEventListener("pointerdown", (event) => {
  selectedElement = player;
  player.setPointerCapture(event.pointerId);
});

player.addEventListener("pointermove", (event) => {
  if (!selectedElement) return;

  const position = getSvgPoint(event);

  player.setAttribute("cx", position.x);
  player.setAttribute("cy", position.y);
});

player.addEventListener("pointerup", () => {
  selectedElement = null;
});
