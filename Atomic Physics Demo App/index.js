const button = document.querySelector("#add");
const removeBtn = document.querySelector("#remove");
const autoAddButton = document.querySelector("#auto-add");
const autoRemButton = document.querySelector("#auto-rem");
const elements = [
  "Hydrogen",
  "Helium",
  "Lithium",
  "Beryllium",
  "Boron",
  "Carbon",
  "Nitrogen",
  "Oxygen",
  "Fluorine",
  "Neon",
  "Sodium",
  "Magnesium",
  "Aluminum",
  "Silicon",
  "Phosphorus",
  "Sulfur",
  "Chlorine",
  "Argon",
  "Potassium",
  "Calcium",
  "Scandium",
  "Titanium",
  "Vanadium",
  "Chromium",
  "Manganese",
  "Iron",
  "Cobalt",
  "Nickel",
  "Copper",
  "Zinc",
  "Gallium",
  "Germanium",
  "Arsenic",
  "Selenium",
  "Bromine",
  "Krypton",
  "Rubidium",
  "Strontium",
  "Yttrium",
  "Zirconium",
  "Niobium",
  "Molybdenum",
  "Technetium",
  "Ruthenium",
  "Rhodium",
  "Palladium",
  "Silver",
  "Cadmium",
  "Indium",
  "Tin",
  "Antimony",
  "Tellurium",
  "Iodine",
  "Xenon",
  "Cesium",
  "Barium",
  "Lanthanum",
  "Cerium",
  "Praseodymium",
  "Neodymium",
  "Promethium",
  "Samarium",
  "Europium",
  "Gadolinium",
  "Terbium",
  "Dysprosium",
  "Holmium",
  "Erbium",
  "Thulium",
  "Ytterbium",
  "Lutetium",
  "Hafnium",
  "Tantalum",
  "Tungsten",
  "Rhenium",
  "Osmium",
  "Iridium",
  "Platinum",
  "Gold",
  "Mercury",
  "Thallium",
  "Lead",
  "Bismuth",
  "Polonium",
  "Astatine",
  "Radon",
  "Francium",
  "Radium",
  "Actinium",
  "Thorium",
  "Protactinium",
  "Uranium",
  "Neptunium",
  "Plutonium",
  "Americium",
  "Curium",
  "Berkelium",
  "Californium",
  "Einsteinium",
  "Fermium",
  "Mendelevium",
  "Nobelium",
  "Lawerencium",
  "Rutherforium",
  "Dubnium",
  "Seaborgium",
  "Bohrium",
  "Hassium",
  "Meitnerium",
  "Darmstadtium",
  "Roentgenium",
  "Copernicium",
  "Nihonium",
  "Flerovium",
  "Moscovium",
  "Livermorium",
  "Tennessine",
  "Oganesson",
];

let speed = 0.001;

const maxElectrons = 86;
let offsetX = 175;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let aufbauOrbitals;
let automating = false;
let lastOrbital = "";

const elementName = document.querySelector("#element-name");
const electronicConfContainer = document.querySelector("#electronic-conf");

button.addEventListener("click", (e) => {
  if (electrons.length < maxElectrons) {
    aufbauOrbitals = aufbauPrinciple(electrons.length + 1);
    // console.log(aufbauOrbitals);
    lastOrbital = aufbauOrbitals
      .split(" ")
      [aufbauOrbitals.split(" ").length - 1].slice(0, 2);
    spawnElectrons(lastOrbital);
    elementName.innerHTML = `${elements[electrons.length - 1]} <sup>${
      electrons.length
    }</sup>`;
    electronicConfContainer.innerText = aufbauOrbitals.replaceAll(" ", " ➡ ");
    // console.log(electrons);⇀
  } else {
    // window.alert("Maximum number of electrons reached!!!");
    // console.log("Max Capacity Reached!!!");
  }
});

removeBtn.addEventListener("click", (e) => {
  if (electrons.length > 1) {
    electrons.pop();
    aufbauOrbitals = aufbauPrinciple(electrons.length);
    // console.log(aufbauOrbitals);
    elementName.innerHTML = `${elements[electrons.length - 1]} <sup>${
      electrons.length
    }</sup>`;
    electronicConfContainer.innerText = aufbauOrbitals.replaceAll(" ", " ➡ ");
    // console.log(electrons);
  } else if (electrons.length === 1) {
    electrons.pop();
    aufbauOrbitals = "";
    elementName.innerHTML = "Element Name <sup>N</sup>";
    electronicConfContainer.innerText = "Electronic Configuration";
    // window.alert("Maximum number of electrons reached!!!");
  } else {
    // console.log("No Electrons To Pop!!!");
  }
});

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const atom = { x: 0, y: 0 };
const nucleus = { x: 0, y: 0, radius: 20 };
let orbitals = {};
let centralDistance = 20;
let electronRadius = 9.5;
let strokeWidth = 2;
let strokeLen = 7;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

if (canvas.width > 1440) {
  nucleus.radius = 50;
  offsetX = 250;
  centralDistance = 35;
  electronRadius = 15;
  strokeLen = 15;
}
if (canvas.width < 1440 && canvas.width >= 1024) {
  nucleus.radius = 15;
  offsetX = 125;
  centralDistance = 17;
  electronRadius = 6;
}
if (canvas.width < 1024 && canvas.width >= 768) {
  nucleus.radius = 15;
  offsetX = 125;
  centralDistance = 14;
  electronRadius = 6;
}
if (canvas.width < 768 && canvas.width >= 425) {
  nucleus.radius = 14;
  offsetX = 0;
  centralDistance = 12.5;
  electronRadius = 5;
  strokeWidth = 1;
}
if (canvas.width < 425 && canvas.width >= 375) {
  nucleus.radius = 10;
  offsetX = 0;
  centralDistance = 11;
  electronRadius = 4;
  strokeWidth = 1;
}
if (canvas.width < 375 && canvas.width >= 320) {
  nucleus.radius = 6;
  offsetX = 0;
  centralDistance = 9.5;
  electronRadius = 4;
  strokeWidth = 1;
}
// ctx.fillStyle = "#14213d";
// ctx.fillRect(0, 0, canvas.width, canvas.height);

// let rotateAngle = 0.01;

function draw(type, x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(
    canvas.width / 2 + x + offsetX,
    canvas.height / 2 + y,
    radius,
    0,
    Math.PI * 2
  );
  ctx.closePath();
  if (type === "atom") {
    // ctx.translate(canvas.width / 2 + x + offsetX, canvas.height / 2 + y);
    // ctx.rotate(rotateAngle);
    // ctx.translate(-(canvas.width / 2 + x + offsetX), -(canvas.height / 2 + y));
    ctx.save();
    ctx.setLineDash([strokeLen, strokeLen]);
    ctx.strokeStyle = color;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
    ctx.restore();
  } else if (type === "electron") {
    ctx.fillStyle = `hsl(${color}, 100%, 50%)`;
    // ctx.fillStyle = "#d9d9d9";
    // ctx.fillStyle = "#72ddf7";
    ctx.fill();
    ctx.strokeStyle = "#fca311";
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
  } else {
    ctx.fillStyle = color;
    ctx.fill();
  }
}

let currentElement = "";
let electrons = [];
let angle = Math.random() * Math.PI;

function spawnElectrons(orb) {
  let angle = Math.random() * Math.PI;
  let x = Math.random() * 400;
  let y = Math.random() * 400;
  let radius = electronRadius;
  let speed = Math.random() * 0.02 + 0.001;
  let color = Math.random() * 360;
  let orbital = orb;
  // console.log("Orbital -> " + orb);
  electrons.push({
    x: x,
    y: y,
    angle: angle,
    speed: speed,
    radius: radius,
    orbital: orbital,
    hue: color,
  });
}

const validateElectronSize = () => {
  if (electrons.length >= maxElectrons) {
    autoAddButton.disabled = true;
    button.disabled = true;
  } else {
    autoAddButton.disabled = false;
    button.disabled = false;
  }
  if (electrons.length <= 0) {
    autoRemButton.disabled = true;
    removeBtn.disabled = true;
  } else {
    autoRemButton.disabled = false;
    removeBtn.disabled = false;
  }
};

function animate() {
  requestAnimationFrame(animate);
  // ctx.fillStyle = "#14213d";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let ind = 1;
  aufbauOrbitals.split(" ").forEach((orb) => {
    if (
      !Object.keys(orbitals).includes(orb.slice(0, 2)) &
      (orb.slice(0, 2) !== "")
    ) {
      orbitals[orb.slice(0, 2)] = nucleus.radius + ind * centralDistance;
    }
    draw(
      "atom",
      atom.x,
      atom.y,
      nucleus.radius + ind * centralDistance,
      "#fca311"
    );
    ind += 1;
  });
  draw("nucleus", nucleus.x, nucleus.y, nucleus.radius, "#ffc300");
  electrons.map((electron) => {
    draw("electron", electron.x, electron.y, electron.radius, electron.hue);
    electron.x = Math.sin(electron.angle) * orbitals[electron.orbital];
    electron.y = Math.cos(electron.angle) * orbitals[electron.orbital];
    electron.angle += electron.speed;
  });
  validateElectronSize();
  if (automating) {
    haltEvents();
  }
  // if (strokeLen <= 20) {
  //   strokeLen += 0.1;
  // } else {
  //   strokeLen = 1;
  // }
}

aufbauOrbitals = "";
animate();

function aufbauPrinciple(atomicNumber = 1) {
  const aufbauOrder = [
    "1s",
    "2s",
    "2p",
    "3s",
    "3p",
    "4s",
    "3d",
    "4p",
    "5s",
    "4d",
    "5p",
    "6s",
    "4f",
    "5d",
    "6p",
    "7s",
    "5f",
    "6d",
    "7p",
    "8s",
  ];
  const maxValenceElectrons = { s: 2, p: 6, d: 10, f: 14 };
  let orderIndex = 0;
  let electronicConfiguration = "";
  let orbitals = [];
  let fillingElectrons = maxValenceElectrons[aufbauOrder[orderIndex].charAt(1)];
  while (atomicNumber - fillingElectrons > 0) {
    electronicConfiguration += aufbauOrder[orderIndex] + fillingElectrons + " ";
    atomicNumber -= fillingElectrons;
    orbitals.push(aufbauOrder[orderIndex]);
    orderIndex++;
    fillingElectrons = maxValenceElectrons[aufbauOrder[orderIndex].charAt(1)];
  }
  if (atomicNumber > 0) {
    electronicConfiguration += `${aufbauOrder[orderIndex]}${atomicNumber}`;
    orbitals.push(aufbauOrder[orderIndex]);
  }
  return electronicConfiguration.trim();
}

function haltEvents() {
  autoAddButton.disabled = true;
  autoRemButton.disabled = true;
}

let intervalTime = 100;

function autoAdd() {
  automating = true;
  let buttonBot = setInterval(() => {
    button.click();
    if (electrons.length === maxElectrons) {
      automating = false;
      clearInterval(buttonBot);
    }
  }, intervalTime);
}

autoAddButton.addEventListener("click", () => {
  autoAdd();
});

function autoRem() {
  automating = true;
  let buttonBot = setInterval(() => {
    removeBtn.click();
    if (electrons.length === 0) {
      automating = false;
      clearInterval(buttonBot);
    }
  }, intervalTime);
}

autoRemButton.addEventListener("click", () => {
  autoRem();
});
