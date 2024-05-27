console.log("It's Working!!!");

// OpenWeatherMap
const inp = document.getElementById("input");
const result = document.querySelector(".type-anime");
const button = document.getElementById("submit");

button.addEventListener("click", () => {
  if (inp.value) {
    result.innerHTML = "";
    inp.value.split("").forEach((element, i) => {
      console.log(element, i);
      result.innerHTML += `<span style='--i: ${i + 1}'>${element}</span>`;
    });
  }
});
