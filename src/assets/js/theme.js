import "../scss/theme.scss";

const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);
const currentTheme = localStorage.getItem("theme");
var body = document.body;

function setdarkMode(type) {
  if (type) {
    document.documentElement.setAttribute("data-theme", "dark");
    body.classList.add("dark");
    localStorage.setItem("theme", "dark");
    toggleSwitch.checked = true;
    return true
  } 
  
    document.documentElement.setAttribute("data-theme", "light");
    removeClass(document.getElementById("body"), "dark")
    localStorage.setItem("theme", "light");
    toggleSwitch.checked = false;

    return false
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  setdarkMode(true)
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  setdarkMode(true)
});

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    setdarkMode(true)
  }
}

function removeClass(ele,cls) {
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    ele.className = ele.className.replace(reg,' ');
}

function switchTheme(e) {
  if (e.target.checked) {
    setdarkMode(true)
  } else {
    setdarkMode(false)
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);
