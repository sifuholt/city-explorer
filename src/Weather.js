
import React from 'react';
import Card from 'react-bootstrap/Card';

class Weather extends React.Component {
  
  render() {

    return (
      <>
        {this.props.weatherData.map((event, index) => {
          return (
            <Card style={{ width: '23rem' }} key = {index}>
              <Card.Body>

                <Card.Title>Date: {event.date}</Card.Title>
                <Card.Text>Weather: {event.description}</Card.Text>

              </Card.Body>
            </Card>
          )
        })}
      </>
    )
  }
}


{/* <WeatherDay date={day.date} */}