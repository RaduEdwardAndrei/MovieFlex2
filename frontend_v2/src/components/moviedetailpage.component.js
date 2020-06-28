import React, { useEffect, useState } from 'react';
import { Table, Container, Button, CardColumns } from 'react-bootstrap';
import { API_URL, API_KEY, IMAGE_URL } from '../config';
import MainImage from './movieComponents/mainImage';
import MovieCardComponent from './moviecard.component';
import ReactPlayer from 'react-player';

const MovieDetailPage = (props) => {

    const [movie, setMovie] = useState([])
    const [actors, setActors] = useState([])
    const [trailer, setTrailer] = useState([])
    const [genres, setGenre] = useState([]);
    const [showActors, setShowActors] = useState(false)
    const [showTrailer, setShowTrailer] = useState(false)
    const youtubeUrl = "https://www.youtube.com/watch?v="

    //Afisez informatii legate de filmul cu movieId corespunzator
    //Afisez informatii legate de actorii ce au jucat in film
    useEffect(() => {
        const movieId = props.match.params.movieId

        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
            .then( response => response.json())
            .then( response => {
                console.log(response)
                setMovie(response)
                console.log("GENRES")
                setGenre(response.genres)
                console.log("GENRES")

                fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
                    .then( response => response.json())
                    .then( response => {
                        console.log(response)
                        setActors(response.cast)
                })

                fetch(`${API_URL}movie/${movieId}/videos?api_key=${API_KEY}`)
                    .then( response => response.json())
                    .then( response => {
                        console.log(response)
                        setTrailer(response.results[0])
                })
            })
    }, [])

    const handleActors = () => {
        setShowActors(!showActors)
    }

    const handleTrailer = () => {
        setShowTrailer(!showTrailer)
    }

    return (
        <Container style={{width: '150%'}}>
            <MainImage image={`${IMAGE_URL}w1280${movie.backdrop_path}`}
                title={movie.original_title} text={movie.overview}
            />
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <td>Movie Title</td>
                        <td>{movie.original_title}</td>
                        <td>Vote Average</td>
                        <td>{movie.vote_average}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Release Date</td>
                        <td>{movie.release_date}</td>
                        <td>Vote Count</td>
                        <td>{movie.vote_count}</td>
                    </tr>
                    <tr>
                        <td>Movie Genres</td>
                        <td>{genres && genres.map((genre, index) => (
                            <span key={index} style={{display:'inline-block'}}>
                                { genre.name && 
                                    <p>{genre.name}&nbsp;</p>
                                }
                            </span>
                             ))}
                        </td>
                        <td>Movie Status</td>
                        <td>{movie.status}</td>
                    </tr>
                    <tr>
                        <td>Movie Runtime</td>
                        <td>{movie.runtime}</td>
                        <td>Movie Popularity</td>
                        <td>{movie.popularity}</td>
                    </tr>
                </tbody>
            </Table>

            <Button size="lg" variant='warning' onClick={handleActors}>View Actors</Button>{' '}

            {/* Afisez actorii doar daca a fost apasat butonul */}
            {showActors && 
                <CardColumns>
                {actors && actors.slice(0,6).map((cast, index) => (
                    <React.Fragment key={index}>
                        { cast.profile_path && 
                        <MovieCardComponent
                            actor
                            image={`${IMAGE_URL}w500${cast.profile_path}`}
                            actorName = {cast.name} />
                        }
                    </React.Fragment>
                ))}
                </CardColumns>
            }

            <Button size="lg" variant='warning' onClick={handleTrailer}>View Trailer</Button>{' '}

            {showTrailer && 
                <ReactPlayer
                    className="container-fluid"
                    url={youtubeUrl + trailer.key}
                    controls = "true"
                    volume
                />
            }

            <Button size="lg" variant='warning' href="/watch">Watch Movie</Button>{' '}

        </Container>
        
    )
}

export default MovieDetailPage;