function drawGrid(number) {
  const fragment = document.createDocumentFragment();
  let flexBasis = 100 / number;

  for (let i = 0; i < number * number; i++) {
    const div = document.createElement("div");
    div.style.flex = `0 0 ${flexBasis}%`;
    div.style.height = `${flexBasis}%`;
    div.classList.add("grid-cell");
    fragment.append(div);
  }
  container.append(fragment);
}

function deleteGrid() {
  container.replaceChildren();
}

function randomizeRGB() {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  };
}

const container = document.getElementById("container");
const editBtn = document.getElementById("edit-button");
let initial = 16;
drawGrid(initial);

container.addEventListener("mouseover", (e) => {
  const div = e.target;
  if (!div.classList.contains("grid-cell")) return;

  let { r, g, b } = randomizeRGB();
  let opacity = Number(div.dataset.opacity || 0);

  if (opacity < 1) {
    opacity += 0.1;
    div.dataset.opacity = opacity;
  }

  div.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
});

editBtn.addEventListener("click", () => {
  const MAX_LIMIT = 100;
  const MIN_LIMIT = 1;
  let input;

  do {
    let response = prompt("Enter number of squares (MAXIMUM 100)");
    if (response === null) return;

    input = Number(response);
  } while (isNaN(input) || input > MAX_LIMIT || input < MIN_LIMIT);
  {
    alert("Passed! Grid size has been changed");
    deleteGrid();
    drawGrid(input);
  }
});
