import React from 'react';
import Card from 'react-bootstrap/Card';

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <>
        {this.props.movieData.map((movie, index) => (
          <Card style={{ width: '23rem' }} key={index}>
            <Card.Body>
              <Card.Title>Title: {movie.title}</Card.Title>
            </Card.Body>
          </Card>
          
        ))}

      </>

    )
  }
}

export default Movies;