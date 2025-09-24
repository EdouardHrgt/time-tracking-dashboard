let data = [];

const buttons = document.querySelectorAll(".periods button");
const sections = document.querySelectorAll(".metrix");

const categoryClassMap = {
  "Work": "work",
  "Play": "play",
  "Study": "study",
  "Exercise": "exercice",
  "Social": "social",
  "Self Care": "self-care"
};

fetch('./data.json')
  .then(res => res.json())
  .then(json => {
    data = json;
    initializeSections();
  })
  .catch(err => console.error("Error loading data.json:", err));

function initializeSections() {
  sections.forEach(section => {
    const categoryKey = section.dataset.category;
    const title = Object.keys(categoryClassMap).find(key => categoryClassMap[key] === categoryKey);
    
    section.classList.add(categoryKey);

    updateSectionTimes(section, title, 'daily');
  });

  buttons.forEach(btn => btn.classList.remove('active'));
  buttons[0].classList.add('active');
}

function updateSectionTimes(section, title, period) {
  const currentEl = section.querySelector(".current");
  const previousEl = section.querySelector(".previous");
  const item = data.find(d => d.title === title);

  if (item && item.timeframes[period]) {
    currentEl.textContent = `${item.timeframes[period].current}hrs`;
    previousEl.textContent = `Previously - ${item.timeframes[period].previous}hrs`;
  }
}

function updateAllSections(period) {
  sections.forEach(section => {
    const categoryKey = section.dataset.category;
    const title = Object.keys(categoryClassMap).find(key => categoryClassMap[key] === categoryKey);

    updateSectionTimes(section, title, period);
  });
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const period = button.textContent.toLowerCase();

    updateAllSections(period);
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});
