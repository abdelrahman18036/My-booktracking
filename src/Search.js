import React from 'react'
import * as BooksAPI from "./API"
import DefaultPage from "./DefaultPage"
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
        Results: [],
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
                        this.setState({Results: []});
                    } else {
                        this.setState({Results: books});
                    }
                })
                .catch(this.setState({Results: []}));
        } else {
            this.setState({Results: []});
        }
    };

    resest = () => {
        this.setState({Results: []});
    }

    render() {
        const {books, shelfing} = this.props;

        this
            .state
            .Results
            .forEach(function (booksearch) {
                books.forEach(function (book) {
                    if (book.id === booksearch.id) {
                        booksearch.shelf = book.shelf;
                    }
                });
                if (!booksearch.shelf) {
                    booksearch.shelf = 'none';
                }
            })

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <DefaultPage resest={this.resest}/>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by author or title."
                            value={this.state.value}
                            onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this
                                .state
                                .Results
                                .map(book => (<Book key={book.id} book={book} shelfing={shelfing}/>))
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export {
    Search as default
}
