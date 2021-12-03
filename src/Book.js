import React from 'react'
import Strategy from "./strategy"

class Book extends React.Component {
    render() {
        const {book, shelfing} = this.props;
        const image = book.imageLinks && book.imageLinks.thumbnail;

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div
                            className="book-cover"
                            style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${image})`
                            }}></div>
                        <Strategy book={book} books={this.props.books} shelfing={shelfing}/>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
            </li>
        )
    }
}

export { Book as default} 