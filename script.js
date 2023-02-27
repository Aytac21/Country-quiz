const hearts = document.getElementById("hearts");
const flag_area = document.getElementById("flag_area");
const options = document.getElementById("options");
const score = document.getElementById("score");
let scoreCount = 0;
let heartCount = 5;

for (let i = 1; i <= heartCount; i++) {
  let li = document.createElement("li");
  let img = document.createElement("img");
  img.setAttribute("src", "country");
  li.append(img);
}

const getCountries = async () => {
  flag_area.innerHTML = "";
  let random = Math.floor(Math.random() * 250);
  const countries = await fetch("https://restcountries.com/v3.1/all")
    .then((a) => a.json())
    .then((a) => {
      return a;
    });

  let flagImg = document.createElement("img");
  flagImg.setAttribute("src", countries[random].flags.png);
  flag_area.append(flagImg);

  let randomLi = Math.floor(Math.random() * 5);

  for (let i = 0; i <= 3; i++) {
    let li = document.createElement("li");
    if (randomLi === i) {
      var correctVariant = countries[random].name.common;
      li.textContent = correctVariant;
      li.classList.add("correct");
    } else {
      let randomForOptions = Math.floor(Math.random() * 250);
      li.textContent = countries[randomForOptions].name.common;
    }
    options.append(li);
  }
};

const heartsLi = [...document.querySelectorAll("#hearts li")];

options.addEventListener("click", (e) => {
  if (e.target.tagName !== "LI") {
    return;
  }
  console.log(e.target);
  if (e.target.classList.contains("correct")) {
    scoreCount++;
    score.textContent = scoreCount;
    options.innerHTML = "";
    flag_area.innerHTML = "";
    getCountries();
  } else {
    options.innerHTML = "";
    flag_area.innerHTML = "";
    heartCount--;
    if (heartCount === 0) {
      alert("Oyun bitdi");
      scoreCount = 0;
      heartCount = 5;
      score.textContent = scoreCount;
    }
    getCountries();
  }
});

getCountries();
