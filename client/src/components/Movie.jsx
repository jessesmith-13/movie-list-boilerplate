import React from 'react';
import MovieInfo from './MovieInfo.jsx';

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      expanded: false,
      watched: false,
      classname: '',
      title: '',
      rating: ''
    }

    this.expand = this.expand.bind(this);
    this.renderExpandedCard = this.renderExpandedCard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  expand() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addRating(this.state.rating, this.props.movie);
  }

  renderExpandedCard() {
    if (this.state.expanded) {
      return (
        <div>
          <p>Year: {this.props.movie.year}</p>
          <p>Score: {this.props.movie.score}</p>
          <p>Personal Rating: {this.props.movie.rating}</p>
          <form onSubmit={this.handleSubmit}>
            <input name='rating' onChange={this.handleChange} ></input>
            <button>Add Rating</button>
          </form>
          <button onClick={(event) => this.props.toggleWatched(this.props.movie)} title={this.props.title} className={this.getButtonClass(this.props.movie)} >Watched</button>
        </div>
      )
    }
  }

  getButtonClass(movie) {
    if (movie.watched === 0) {
      return '';
    } else {
      return 'watched2';
    }
  }

  render() {
    return (
      <div>
        <h3 className='title' onClick={this.expand}>{this.props.title}</h3>
        <button onClick={((event) => this.props.removeMovie(this.props.movie))}>Remove</button>
        {this.renderExpandedCard()}
      </div>
    )
  }
};

export default Movie