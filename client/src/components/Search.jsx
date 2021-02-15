import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBar: ''
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
    this.props.searchMovie(this.state.searchBar);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          <input name='searchBar' value={this.state.searchBar} onChange={this.handleChange} id="searchInput" />
          <button >Go!</button>
        </form>
      </div>
    );
  }
}

export default Search