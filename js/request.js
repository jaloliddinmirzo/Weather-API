const key = "e3563ce0eabcf87567ede4d735a5cb02" 


async function getData(ctiy){
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${ctiy}&appid=${key}`
    lodr(true)
    const req = await fetch(API)
    if (req.status !== 200) {
        lodr(false)
        return;
    }
    const data = await req.json()
    lodr(false)

    return data;
} 
