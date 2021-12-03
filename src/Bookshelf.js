import React from 'react'
import Book from "./Book"

class Bookshelf extends React.Component {
  render() {
    const { shelf, books, shelfing } = this.props;

    return (
      <div className="Bookshelf">
        <h2 className="Bookshelf-title">{shelf.name}</h2>
        <div className="Bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <Book key={book.id} book={book} shelfing={shelfing} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export { Bookshelf as default} 