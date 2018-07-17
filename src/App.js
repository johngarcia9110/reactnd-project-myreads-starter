import React from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks';
import Bookshelf from './Bookshelf';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    myBooks : [],
  };

  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState(() => ({
          myBooks : books
      }))
    })
  };

  updateBookShelf = (bookID, book) => {

      let booksCopy = this.state.myBooks;
      let index = booksCopy.findIndex( (y) => y.id === bookID );

      if(index === -1){ //book is not on any shelf
          booksCopy.push(book);
      }else{
          booksCopy[index] = book;
      }

      this.setState({
          myBooks : booksCopy
      });

      BooksAPI.update(book, book.shelf);

  };


  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
            <SearchBooks
                onChangeShelf={(key, book, shelf) => {
                    this.updateBookShelf(key,book,shelf);
                }}
                myBooks={this.state.myBooks}
            />
        )}>
        </Route>
        <Route exact path="/" render={() => (

            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <Bookshelf books={this.state.myBooks} onChangeShelf={(key, book, shelf) => {
                        this.updateBookShelf(key,book,shelf);
                    }}/>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )}>
        </Route>
      </div>
    )
  }
}

export default BooksApp
