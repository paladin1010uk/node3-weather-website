console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#p1')
const messageTwo = document.querySelector('#p2')
const messageThree= document.querySelector('#p3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
            messageTwo.textContent = ''
            messageThree.textContent = ''
        } else {
            messageOne.textContent = 'Location is ' + data.location 
            messageTwo.textContent = data.forecast.description + '. The temperature is ' + data.forecast.temperature + ' degrees and there is a ' + data.forecast.precip + ' chance of rain'
            messageThree.textContent = 'And pressure is ' + data.forecast.pressure + ' and humidity is ' + data.forecast.humidity
        }
    })
})

})