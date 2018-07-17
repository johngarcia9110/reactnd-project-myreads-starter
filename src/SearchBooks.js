import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import {Link} from 'react-router-dom';


class SearchBooks extends Component{

    static propTypes = {
        onChangeShelf : PropTypes.func.isRequired
    };

    state = {
        query : '',
        results : []
    };

    searchNewBook = (query) => {
        this.setState({ query: query.trim(), results: [] });
        if(query.length > 3){
            BooksAPI.search(query).then((results)=>{

                if(results.error){
                    return;
                }

                this.setState({
                    results : results.map((book) => {
                        // check if any of the books in our search results are also currently on any of our shelves
                        let bookInMyBooks = this.props.myBooks.find((myBook) => ( myBook.id === book.id ) );
                        book.shelf = bookInMyBooks ? bookInMyBooks.shelf : 'none';
                        return book;
                    }),
                })

            })
        }
    };

    render() {
        const {onChangeShelf} = this.props;
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(e) => {this.searchNewBook(e.target.value)}}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.state.results.length > 0 &&(
                                this.state.results.map((book,index) => (
                                    <Book key={index} bookInfo={book} onChangeShelf={onChangeShelf}/>
                                ))
                            )
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks;