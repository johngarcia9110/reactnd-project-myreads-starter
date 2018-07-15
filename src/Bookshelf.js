import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class Bookshelf extends Component{

    static PropTypes = {
        books : PropTypes.array.isRequired,
        onChangeShelf : PropTypes.func.isRequired
    };

    render(){
        const {books, onChangeShelf} = this.props
        return(
        <div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.filter(book => book.shelf === 'currentlyReading').map((book, index) => {
                            return <Book key={index} bookInfo={book} onChangeShelf={onChangeShelf} />
                        })}
                    </ol>
                </div>
            </div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">Want To Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.filter(book => book.shelf === 'wantToRead').map((book, index) => {

                            return <Book key={index} bookInfo={book} onChangeShelf={onChangeShelf}/>

                        })}
                    </ol>
                </div>
            </div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.filter(book => book.shelf === 'read').map((book, index) => {

                                return <Book key={index} bookInfo={book} onChangeShelf={onChangeShelf}/>

                        })}
                    </ol>
                </div>
            </div>
        </div>
        )
    }
}

export default Bookshelf;