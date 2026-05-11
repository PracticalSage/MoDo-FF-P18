const svg = document.querySelector("svg");
const player = document.querySelector(".player-blue");

let isDragging = false;

function getSvgPoint(event) {
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  return point.matrixTransform(svg.getScreenCTM().inverse());
}

player.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  isDragging = true;
});

svg.addEventListener("pointermove", (event) => {
  if (!isDragging) return;

  event.preventDefault();

  const position = getSvgPoint(event);

  player.setAttribute("cx", position.x);
  player.setAttribute("cy", position.y);
});

svg.addEventListener("pointerup", () => {
  isDragging = false;
});

svg.addEventListener("pointercancel", () => {
  isDragging = false;
});
