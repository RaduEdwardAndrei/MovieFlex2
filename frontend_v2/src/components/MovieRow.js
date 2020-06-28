import React from 'react'
import { Button } from 'reactstrap';

class MovieRow extends React.Component {

    render() {
        return (
            <table key={this.props.movie.id}>
            <tbody>
            <tr>
                <td>
                <img alt="poster" width="120" src={this.props.movie.poster_src} />
                </td>
                <td>
                <h3 style={{color: 'white'}}>{this.props.movie.title}</h3>
                <p style={{color: 'white'}}> {this.props.movie.overview}</p>
                <Button style={{background: '#ffb84d', border: '#ffff'}} href={`/movie/${this.props.movie.id}`}>View Movie</Button>
                </td>
            </tr>
            </tbody>
            </table>
        )
    }
}

export default MovieRow