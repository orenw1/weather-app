const getForecast = (address) => {
    messageOne.textContent = ''
    messageTwo.textContent = 'Loading'

    // update for Heroku the domain and port
    //fetch('http://localhost:3000/weather?address=' + address).then((response) => {
    fetch('/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                console.log('Data: ' + JSON.stringify(data));
                console.log('Location: ' + data.place);
                console.log('Forecast: ' + data.forecast);
                messageOne.textContent =  data.place
                messageTwo.textContent = data.forecast
            }
        })
    })

}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript'
// messageTwo.textContent = 'From JavaScrip2'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const addressValue = search.value
    console.log('in submit1: ' + addressValue);
    getForecast(addressValue)

})