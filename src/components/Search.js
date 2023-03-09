import React from "react";

class Search extends React.Component {
  state = { term: "" };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.term);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <label>Search: </label>
          <input
            type="text"
            placeholder="Search here"
            value={this.state.term}
            onChange={(e) => this.setState({ term: e.target.value })}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
export default Search;
