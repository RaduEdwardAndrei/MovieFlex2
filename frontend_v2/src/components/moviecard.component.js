import React from 'react';
import { Card, Container, Button } from 'react-bootstrap';

const MovieCardComponent = (props) => {

    if ( props.actor ) {
        return (
            <Container >
                <Card className="my-3" text="white" style={{background: '#ffb84d', border: '#1a0f00'}}>
                    <Card.Img variant="top" src={props.image} alt={props.actorName} />
                    <Card.Header as='h5'>{props.actorName}</Card.Header>
                </Card>
          </Container>
        );
    } else {
        return (
            <Container >
                <Card className="my-3" text="white" style={{background: '#ffb84d', border: '#1a0f00'}}>
                    <Card.Img variant="top" src={props.image} alt={props.movieName} />
                    <Card.Header as='h5'>{props.movieName}</Card.Header>
                    <Card.Body style={{textAlign:'center'}}>
                        <Button style={{background: '#1a0f00', border: '#ffff'}} href={`/movie/${props.movieId}`}>View Movie</Button>
                    </Card.Body>
                </Card>
          </Container>
        );
    }

}

export default MovieCardComponent;