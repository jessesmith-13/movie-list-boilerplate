import React from 'react';
import AddMovie from './AddMovie.jsx';
import Movie from './Movie.jsx';


class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <button onClick={this.props.logState} >Log State</button>
        <button onClick={this.props.displayWatched} >Watched</button>
        <button onClick={this.props.displayToWatch} >To Watch</button> 
        {this.props.movies.map((movie, index) => <Movie addRating={this.props.addRating} key={index} removeMovie = {this.props.removeMovie} toggleWatched={this.props.toggleWatched} movie={movie} title={movie.title} />) }
      </div>
    )
  }
};

export default MovieList