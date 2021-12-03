import React from 'react'
import * as BooksAPI from "./API"
import HomePage from "./HomePage"
import Book from "./Book"
class Search extends React.Component {
    state = {
        /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
        showBarshearch: false,
        searchResults: [],
        value: ''
    }

    handleChange = event => {
        const value = event.target.value;
        this.setState({value: value});

        if (value.length > 0) {
            BooksAPI
                .search(value)
                .then(books => {
                    if (books.error) {
                        this.setState({searchResults: []});
                    } else {
                        this.setState({searchResults: books});
                    }
                })
                .catch(this.setState({searchResults: []}));
        } else {
            this.setState({searchResults: []});
        }
    };

    resetSearch = () => {
        this.setState({searchResults: []});
    }

    render() {
        const {books, shelfing} = this.props;

        this
            .state
            .searchResults
            .forEach(function (searchedBook) {
                books.forEach(function (book) {
                    if (book.id === searchedBook.id) {
                        searchedBook.shelf = book.shelf;
                    }
                });
                if (!searchedBook.shelf) {
                    searchedBook.shelf = 'none';
                }
            })

        return (
            <div className="search-books">
            <div className="search-books-bar">
              <HomePage resetSearch={this.resetSearch} />
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={this.state.value} onChange={this.handleChange} />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {this.state.searchResults.map(book => (
                  <Book key={book.id} book={book} shelfing={shelfing} />
                ))}
              </ol>
            </div>
          </div>
        )
    }
}

  
export { Search as default} 
