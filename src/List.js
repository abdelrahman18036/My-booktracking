import React from 'react'
import Bookshelf from "./Bookshelf"
import Barshearch from "./Barshearch"

class List extends React.Component {
  render() {
    const { books, shelves, shelfing } = this.props;
    console.log(books);
    // filter books for a particular shelf
    function booksOnShelf (shelf){
      return books.filter(book => book.shelf === shelf.key)
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyBooks</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map(shelf => (
              <Bookshelf key={shelf.key} shelf={shelf} books={booksOnShelf(shelf)} shelfing={shelfing} />
            ))}
          </div>
        </div>
        <Barshearch />
      </div>
    )
  }
}

export { List as default} 

