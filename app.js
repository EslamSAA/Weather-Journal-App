/* Global Variables */
// Dynamic new date instance
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

// Personal API Key for OpenWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?id='
let apiKey = '&appid=0ea25fab97d05af9d0d902865bba08e6';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {

    const cityID = document.getElementById('zip').value;
    const userFeeling = document.getElementById('feelings').value;

    getCityData(baseURL, cityID, apiKey)
        .then(function (data) {
            console.log(data);
            postData('/add', { city: data.name, temp: data.main.temp, date: newDate, response: userFeeling })
        })
        .then(() => {
            updateUI()
        });
}

/* Function to GET Web API Data*/
const getCityData = async (baseURL, cityID, apiKey) => {
    const res = await fetch(baseURL + cityID + apiKey)
    try {
        const data = await res.json();
        console.log(data);
        return data
    }
    catch (error) {
        console.log("error", error);
    }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }
    catch (error) {
        console.log("error", error);
    }
}

/* Function to dynamically update UI */
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log(allData);
        console.log(allData[allData.length - 1].temp);
        document.getElementById('city').innerHTML = "City : " + allData[allData.length - 1].city;
        document.getElementById('date').innerHTML = "Date : " + allData[allData.length - 1].date;
        document.getElementById('temp').innerHTML = "Temperature : " + allData[allData.length - 1].temp + ' K';
        document.getElementById('content').innerHTML = "You're feeling : " + allData[allData.length - 1].response;

    } catch (error) {
        console.log("error", error);
    }
}
