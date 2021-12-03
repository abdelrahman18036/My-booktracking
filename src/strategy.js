import React from 'react'


class Strategy extends React.Component {
  state = {
    value: this.props.book.shelf,
  }
  handleChange = event => {
    this.setState({ value: event.target.value });
    this.props.shelfing(this.props.book, event.target.value);
  }
  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.state.value} onChange={this.handleChange} >
          <option value="move" disabled>Insert in the following</option>
          <option value="currentlyReading">Reading Right Now</option>
          <option value="wantToRead">Interested in Reading</option>
          <option value="read">Read</option>
          <option value="none">Remove</option>
        </select>
      </div>
    )
  }
}

export { Strategy as default} 