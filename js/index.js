const form = document.querySelector("form")
const input = document.querySelector("input")
const weatherIcon = document.querySelector(".card__icon")
const overlay = document.querySelector(".overlay")
const card = document.querySelector(".card")

let zona = () => {
    let time = new Date()
    let a = String(time).split("(")
    let b = a[1].split(",")[0]
    return b;
}

// error
let error = () => {
    input.style.border = "rgb(168, 72, 72) solid 3px"
    input.classList.toggle("red")
    input.placeholder = "No found..."
    let i = 0;
    setTimeout(() => {
            input.style.border = "none"
            input.classList.toggle("red")
            input.placeholder = "City name..."
            i++
            return
    }, 3000);
}


let local = JSON.parse(localStorage.getItem("key"))

if (local) {
    upDateUI(local)
} else {
    getWeather(zona()).then((data) => {
        upDateUI(data)
    })
}

// lodr
function lodr(pra) {
    pra ? overlay.classList.toggle("hidden") : overlay.classList.toggle("hidden")
}

function upDateUI(data) {
    // console.log(data);
    card.innerHTML = `
    <h2 class="card__city">${data.name}, ${data.sys.country} </h2>
        <img class="card__icon" src=" https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="weather icon" width="100" height="100">
        <h2 class="card__weather">${data.weather[0].main}</h2>
        <h3 class="card__temp"><span>${Math.trunc(data.main.temp - 273)}</span> °C</h3>
    `
}

async function getWeather(city) {
    const data = await getData(city)

    return data
}


form.addEventListener("submit", (e) => {
    e.preventDefault()
    const city = input.value.trim()

    getWeather(city).then((data) => {
        upDateUI(data)
        localStorage.setItem("key", JSON.stringify(data))
    }).catch((data) => {

        error()

    })
    form.reset()
})

