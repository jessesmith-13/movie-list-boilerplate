import React from 'react';
import Movie from './Movie.jsx';

class AddMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addMovie(this.state)
    this.setState({
      title: ''
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input name='title' onChange={this.handleChange} value={this.state.title} id="addInput" />
          <button >Add</button>
        </form>   
      </div>
    )
    
  }
  
};

export default AddMovie;