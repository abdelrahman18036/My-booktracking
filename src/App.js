import React from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import * as BooksAPI from "./API"
import List from "./List"
import Search from "./Search"

class App extends React.Component {
    state = {
        /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
        showBarshearch: false,
        books: [],
        searchedBooks: [],
        isLoading: true
    }

    fetch() {
        BooksAPI
            .getAll()
            .then(books => {
                this.fetch();
            });
    }

    componentDidMount() {
        BooksAPI
            .getAll()
            .then((books) => {
                this.setState({books})
            })
    }

    shelves = [
        {
            key: 'currentlyReading',
            name: 'Reading Right Now'
        }, {
            key: 'wantToRead',
            name: 'Interested in Reading'
        }, {
            key: 'read',
            name: 'Read'
        }
    ]

    ChangeShelf = (book, shelf) => {
        BooksAPI
            .update(book, shelf)
            .then(books => {
                if (book.shelf === 'none' && shelf !== 'none') {
                    this.setState(state => {
                        const newBooks = state
                            .books
                            .concat(book);
                        return {books: newBooks}
                    })
                }

                const updatedBooks = this
                    .state
                    .books
                    .map(c => {
                        if (c.id === book.id) {
                            c.shelf = shelf
                        }
                        return c;
                    });

                this.setState({books: updatedBooks});

                if (shelf === 'none') {
                    this.setState(state => {
                        const newBooks = state
                            .books
                            .filter(deleteBook => deleteBook.id !== book.id);
                        return {books: newBooks}
                    })
                }
            });
    }

    render() {
        const {books} = this.state;

        return (
            <div className="app">
                <Route
                    path='/search'
                    render={() => (<Search books={books} shelfing={this.ChangeShelf}/>)}/>

                <Route
                    exact="exact"
                    path='/'
                    render={() => (
                        <List
                            books={books}
                            shelves={this.shelves}
                            shelfing={this.ChangeShelf}/>
                    )}/>
            </div>
        )
    }
}

export { App as default} 
