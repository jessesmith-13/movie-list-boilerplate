import React from 'react';
import { render } from 'react-dom';
import MovieList from './MovieList.jsx';
import Search from './Search.jsx';
import AddMovie from './AddMovie.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allMovies: [],
      movies: [],
      watched: [],
      toWatch: [],
      found: true
    }

    this.getMovies = this.getMovies.bind(this);
    this.addMovie = this.addMovie.bind(this);
    this.toggleWatched = this.toggleWatched.bind(this);
    this.removeMovie = this.removeMovie.bind(this);
    this.logState = this.logState.bind(this);
    this.displayWatched = this.displayWatched.bind(this);
    this.displayToWatch = this.displayToWatch.bind(this);
    this.searchMovie = this.searchMovie.bind(this);
    this.addRating = this.addRating.bind(this);
    // this.runSearch = this.runSearch.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  componentDidMount() {
    this.getMovies();
    // this.runSearch();
  }


  getMovies() {
    axios.get('/api/movies')
      .then(({ data }) => {
        let watched = [];
        let toWatch = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].watched === 0) {
            toWatch.push(data[i])
          } else {
            watched.push(data[i]);
          }
        }

        this.setState({ 
          allMovies: data,
          movies: data,
          watched: watched,
          toWatch: toWatch
        }) 
      })
      .catch(err => console.log(err));
    
  }
  
  addMovie(movie) {
    let url = `https://api.themoviedb.org/3/search/movie/?api_key=6ad4dc5c9464fbf3124d44bea02eef85&query=${movie.title}`
    fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        let targetMovie = data.results.filter(tmdbmovie => tmdbmovie.title === movie.title)[0];
        movie.year = targetMovie.release_date.slice(0, 4);
        movie.score = targetMovie.vote_average;
        axios.post('/api/movies', movie)
          .then(() => this.getMovies())
          .catch(err => console.log(err));
      })
    // axios.post('/api/movies', movie)
    //   .then(() => this.getMovies())
    //   .catch(err => console.log(err));
  }

  toggleWatched(movie) {
    if(movie.watched === 0) {
      movie.watched = 1;
    } else {
      movie.watched = 0;
    }
    axios.put('/api/movies', movie)
      .then(() => this.getMovies())
      .catch(err => console.log(err));
    
    
  }

  removeMovie(movie) {
    axios.delete('/api/movies', {data: movie})
      .then(() => this.getMovies())
      .catch(err => console.log(err));
  }

  logState() {
    console.log(this.state);
  }

  displayWatched() {
    this.setState({
      movies: this.state.watched
    })
  }

  displayToWatch() {
    this.setState({
      movies: this.state.toWatch
    })
  }

  searchMovie(movieTitle) {
    let foundMovies = this.state.allMovies.filter(movie => movie.title.toLowerCase().includes(movieTitle.toLowerCase()));
    if (foundMovies.length === 0) {
      this.setState({
        movies: [],
        found: false
      })
    } else {
      this.setState({
        movies: foundMovies,
        found: true
      })
    }
   
  }
  
  renderError(movieTitle) {
    if (!this.state.found) {
      return (<p>Movie Cannot be Found</p>);
    }
  }

  addRating(rating, movie) {
    movie.rating = rating;
    axios.put('/api/movies', movie)
      .then(() => this.getMovies())
      .catch(err => console.log(err));
  }

  // runSearch(keyword) {
  //   fetch(url)
  //     .then((result) => {
  //       console.log(result.json())
  //     })
  // }

  render() {
    return (
      <div>
        
        
        <nav className="navBar">
          <AddMovie addMovie={this.addMovie}/>
        </nav>

        <div className="watchedornot">
          <nav className="watchedNavBar">
            <div><Search searchMovie={this.searchMovie}/></div>
          </nav>
        </div>

        <div>
          <MovieList addRating={this.addRating} displayToWatch = {this.displayToWatch} displayWatched={this.displayWatched} logState={this.logState} removeMovie={this.removeMovie} toggleWatched={this.toggleWatched} movies={this.state.movies}/>
          {this.renderError()}
        </div>
      </div>

    );
  }
}
export default App;