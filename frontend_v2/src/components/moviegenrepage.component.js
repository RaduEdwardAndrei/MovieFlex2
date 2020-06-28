import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_URL } from '../config';
// import MainImage from './movieComponents/mainImage';
import { Container, CardColumns, Button, Nav } from 'react-bootstrap';
import MovieCardComponent from './moviecard.component';

const MovieGenrePage = (props) => {

    const [movies, setMovies] = useState([])
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        let genreId = props.match.params.genreId
        const endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}`
        fetchMovies(endpoint)
    }, [])

    const fetchMovies = (path) => {

        fetch(path)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            //vreau sa pastrez si pagina precedenta cu filme
            setMovies([...movies, ...response.results])
            setCurrentPage(response.page)
        })
    }

    const handleLoadMore = () => {
        const endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&&page=${currentPage + 1}`

        fetchMovies(endpoint)
    }

    return (
        <Container>
            <CardColumns>
                {movies && movies.map((movie, index) => (
                    <React.Fragment key={index}>
                        <MovieCardComponent
                            image={movie.poster_path ?
                                `${IMAGE_URL}w500${movie.poster_path}`
                                : null}
                            movieId={movie.id}
                            movieName={movie.original_title}
                        />
                    </React.Fragment>
                ))}
            </CardColumns>
            <Nav>
                <Button size="lg" variant='warning' onClick={handleLoadMore}>Load More</Button>{' '}
            </Nav>
        </Container>
    );

}

export default MovieGenrePage;