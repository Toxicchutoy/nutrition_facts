let table;

const url =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTwxKDaixC1TIBzJSHAkaZJzVJ8TEwg91wNNSeRs4NGpgDxcgL0FB4cTUfrG2ppjS2QCGWrLsnikh8d/pub?gid=0&single=true&output=csv";

function preload() {
  table = loadTable(url, "csv", "header");
}

function setup() {
  noCanvas();

  console.log("Table loaded? Row count:", table.getRowCount());
  console.log("Columns:", table.columns);

  background(240);
  textAlign(CENTER, CENTER);
  textSize(18);
  text("Food Nutrition Flip Cards", width / 2, height / 2);

  // select or create the container
  let container = createDiv().id("card-container");

  function createStat(label, value, min, max) {
    let percent = map(constrain(value, min, max), min, max, 0, 100);
    return `
    <div class="stat">
      <span>${label}: ${value}</span>
      <div class="bar"><div style="width:${percent}%"></div></div>
    </div>
  `;
  }

  // create and add cards to the container
  for (let i = 0; i < table.getRowCount(); i++) {
    let food = table.getString(i, "Food");
    let calories = table.getString(i, "Calories");
    let sugar = table.getString(i, "Sugar");
    let cholesterol = table.getString(i, "Cholesterol");
    let sodium = table.getString(i, "Sodium");
    let carbs = table.getString(i, "Total Carbs");

    // card wrapper
    let card = createDiv().addClass("battle-card");
    card.parent(container);

    // front of card
    let front = createDiv().addClass("card-front");
    front.html(`
      <h2 class="food-name">${food}</h2>
      <p class="food-type">🍽️ Nutrition Stats</p>
    `);
    front.parent(card);

    // back of card
    let back = createDiv().addClass("card-back");
    back.html(`
      <div class="stats">
        ${createStat("Calories", calories, 0, 400)}
        ${createStat("Sugar", sugar, 0, 50)}
        ${createStat("Cholesterol", cholesterol, 0, 300)}
        ${createStat("Sodium", sodium, 0, 1000)}
        ${createStat("Carbs", carbs, 0, 200)}
      </div>
    `);
    back.parent(card);
    //flip on click
    card.mousePressed(() => {
      card.toggleClass("flipped");
    });
  }
}

function draw() {
  // background(220);
}
