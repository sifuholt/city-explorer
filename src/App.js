import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Movies from './Movies';
import Cities from './Cities';



class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      error: false,
      errorMessage: '',
      mapUrl: '',
      isCity: false,
      weatherData: [],
      isWeather: false,
      movieData: [],

    }
  }

  handleInput = (event) => {
    this.setState({
      city: event.target.value
  
    })
  }


  getCityData = async (event) => {
    event.preventDefault();
  
    try {
          // use axios to hit locationiq - async/await
      let url = `https://us1.locationiq.com/v1/search?key=pk.9790c77f9ad61635e1a5311b302f5545&q=${this.state.city}&format=json&limit=1`;
  
      let cityDataFromAxios = await axios.get(url);
      let lat = cityDataFromAxios.data[0].lat;
      let lon = cityDataFromAxios.data[0].lon;
      this.setState({
        cityData: cityDataFromAxios.data,
        error: false,
        isCity: true,
  
      })

        // save data to state
      this.handleWeather(lat, lon);
      this.handleMovie();
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.errorMessage
      })
    }
  }


  handleWeather = async (lat, lon) => {

    try {
      let url = `localhost:3001/weather?lat=${lat}&lon=${lon}`;
      console.log(url);

      let weatherData = await axios.get(url);
      console.log(weatherData);

      this.setState({
        weatherData: weatherData.data,
        isWeather: true,
  
      })

    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message
      })

    }
  }


handleMovie = async () => {
  try {
    let url = `http://localhost:3001/movies?query=${this.state.city}`;
    console.log(url);

    let movieData = await axios.get(url);
    console.log(movieData);
    this.setState({
      movieData: movieData.data
    })

  } catch (error) {
    this.setState({
      error: true,
      errorMessage: error.message

    })
  }
}



render() {



  return (
    <>
      <h1>Ken's City Explorer</h1>;
      <form onSubmit={this.getCityData}>;
        <label htmlFor="">Choose Your City!
          <input type="text" onInput={this.handleInput} />;
          <button type="submit">Get Out There!</button>
        </label>
      </form>
      <main>
        {
          this.state.error
            ? <p>{this.state.errorMessage}</p>
            : <div>
              <Cities cityData={this.state.cityData} />
              {/* <Weather weatherData={this.state.weatherData} /> */}
              <Movies movieData={this.state.movieData} />
            </div>
        }
      </main>


    </>

  )
}

}


export default App;



