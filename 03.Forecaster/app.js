function attachEvents () {
  let submitButton = document.getElementById('submit');
  let forecastDiv = document.getElementById('forecast');
  let currentForecastDiv = document.getElementById('current');
  let upcomingForecastDiv = document.getElementById('upcoming');

  submitButton.addEventListener('click', () => {
    let location = document.getElementById('location').value;

    getData(location);
    forecastDiv.style.display = 'block';
  });

  async function getData (location) {
    try {
      let url = `http://localhost:3030/jsonstore/forecaster/locations`;
      let res = await fetch(url);
      let data = await res.json();

      let locationCodeIndex = data.map(targetObject => targetObject.name).indexOf(location);
      let locationCode = data[locationCodeIndex].code;


      let currentConditionsRequest = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${locationCode}`);
      let currentConditionsData = await currentConditionsRequest.json();

      let currentCondition = currentConditionsData.forecast.condition;
      let currentHigh = currentConditionsData.forecast.high;
      let currentLow = currentConditionsData.forecast.low;

      let fullLocationName = currentConditionsData.name;

      createCurrentForecastDiv(fullLocationName, currentCondition, currentHigh, currentLow);

      let threeDaysForecastRequest = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${locationCode}`);
      let threeDaysForecastData = await threeDaysForecastRequest.json();

      for (let forecast in threeDaysForecastData.forecast) {
        let condition = threeDaysForecastData.forecast[forecast].condition;
        let high = threeDaysForecastData.forecast[forecast].high;
        let low = threeDaysForecastData.forecast[forecast].low;
        createThreeDaysForecastDiv(condition, high, low);
      }
    } catch {
      alert('Error');
    }

  }

  function createCurrentForecastDiv (location, currentCondition, currentHigh, currentLow) {
    let forecastsDiv = document.createElement('div');
    forecastsDiv.className = 'forecasts';

    let weatherSymbolSpan = document.createElement('span');
    weatherSymbolSpan.className = `condition symbol`;
    weatherSymbolSpan.innerHTML = getWeatherSymbol(currentCondition);

    let parentSpan = document.createElement('span');
    parentSpan.className = 'condition';

    let locationSpan = document.createElement('span');
    locationSpan.className = 'forecast-data';
    locationSpan.textContent = location;

    let highLowSpan = document.createElement('span');
    highLowSpan.className = 'forecast-data';
    highLowSpan.innerHTML = currentLow + '&#176' + '/' + currentHigh + '&#176';

    let weatherSpan = document.createElement('span');
    weatherSpan.className = 'forecast-data';
    weatherSpan.textContent = currentCondition;

    parentSpan.appendChild(locationSpan);
    parentSpan.appendChild(highLowSpan);
    parentSpan.appendChild(weatherSpan);

    forecastsDiv.appendChild(weatherSymbolSpan);
    forecastsDiv.appendChild(parentSpan);

    currentForecastDiv.appendChild(forecastsDiv);
  }

  function createThreeDaysForecastDiv (currentCondition, high, low) {

    let forecastsDiv = document.createElement('div');
    forecastsDiv.className = 'forecast-info';

    let parentSpan = document.createElement('span');
    parentSpan.className = 'upcoming';

    let symbolSpan = document.createElement('span');
    symbolSpan.className = 'symbol';
    symbolSpan.innerHTML = getWeatherSymbol(currentCondition);

    let highLowSpan = document.createElement('span');
    highLowSpan.className = 'forecast-data';
    highLowSpan.innerHTML = low + '&#176' + '/' + high + '&#176';

    let conditionData = document.createElement('span');
    conditionData.className = 'forecast-data';
    conditionData.innerHTML = currentCondition;

    parentSpan.appendChild(symbolSpan);
    parentSpan.appendChild(highLowSpan);
    parentSpan.appendChild(conditionData);



    upcomingForecastDiv.appendChild(parentSpan);
    console.log(upcomingForecastDiv);

  }

  function getWeatherSymbol (currentCondition) {
    let weatherSymbol = '';
    switch (currentCondition) {
      case 'Sunny': {
        weatherSymbol = '&#x2600';
        break;
      }
      case 'Partly sunny': {
        weatherSymbol = '&#x26C5';
        break;
      }
      case 'Overcast': {
        weatherSymbol = '&#x2601';
        break;
      }
      case 'Rain': {
        weatherSymbol = '&#x2614';
        break;
      }
      case 'Degrees': {
        weatherSymbol = '&#176';
        break;
      }
    }
    return weatherSymbol;
  }
}

attachEvents();