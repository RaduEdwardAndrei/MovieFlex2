import React, { Component }  from 'react';
import { Input, Button, Form, Container } from 'reactstrap';
import { API_URL, API_KEY, IMAGE_URL } from '../config';
import MovieRow from './MovieRow.js'
import $ from 'jquery'

export class SearchComponent extends Component {
  
  searchTerm='';

  constructor(props) {
    super(props)
    this.state={}

    this.performSearch(this.searchTerm)
  }

  performSearch(searchTerm) {
    console.log('Perform Search Usind Moviedb')
    const urlString = `${API_URL}search/movie/?api_key=${API_KEY}&language=en-US&query=${searchTerm}`
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log('Fetched data succesfully')

        const results = searchResults.results

        var movieRows = []

        results.forEach((movie) => {
          movie.poster_src = `${IMAGE_URL}w185` + movie.poster_path
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })

        this.setState({ rows: movieRows })
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })
  }

  searchChangeHandler(event) {
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.performSearch(searchTerm)
  }

  render() {
    return (
        <Form className="ml-auto" onSubmit={this.onSubmit}>
          <Input
            type="search"
            name="search"
            id="movieSearch"
            placeholder="Search for a movie"
            onChange={this.searchChangeHandler.bind(this)}
          />
          {this.state.rows}
        </Form>
    );
  }
}


export default SearchComponent;