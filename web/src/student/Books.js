import React, { Component } from 'react';
import { MdPerson } from 'react-icons/md';
import { ImBooks } from 'react-icons/im';
import { CgPlayListAdd } from 'react-icons/cg';
import OneBook from './OneBook';
import BookReader from './BookReader';
import { tellUser, MAIN_URL, loader } from '../Helper';
import $ from 'jquery';

export default class Books extends Component{
  constructor(props){
    super(props);
    this.state = {
      books: [],
      showBookReader: false,
    };
    this.books = <div></div>;
    this.reader = <div></div>;
  }

  readerCallback = (url) => {
    //..
    this.reader = <BookReader url={url} closer={this.readerCloser} />;
    this.setState({
      showBookReader: true,
    })
  }

  readerCloser = () => {
    //$('#bookReader').fadeOut();
    this.setState({
      showBookReader: false,
    })
  }

  componentDidMount(){
    this.getAllBooks();
  }

  getAllBooks = () => {
    loader(true);
    $.post(MAIN_URL+'get_student_books.php', {}, (data, status) => {
      loader(false);
      if(status === 'success'){
        let response = JSON.parse(data);
        if(response.status === 1){
          this.books = response.books.map((item) => {
            return (
              <OneBook readerCallback={this.readerCallback} getAllBooks={this.getAllBooks} key={"bk_"+item.id} data={item}/>
            );
          });

          this.setState({
            books: response.books,
          })
        }
        else{
          tellUser(response.msg);
        }
      }
      else{
        tellUser('Unkown error, check your connection');
      }
    });
  }

  getReader = () => {

  }


  render(){
    return (
      <div>
        {(this.state.showBookReader) ? this.reader : ''}
        <div className="Books" id="mainView">

          <h3 className="sectionTitle">My Books</h3><hr/>
          <div className="row">

            <div className="col-md-12 col-sm-12 p-2" style={{marginTop:"40px"}}>
              <div className="d-flex flex-row" style={{ width: "100%"}}>
                <div className="flex-grow-1 align-self-center">
                  <h5><b>All Books</b></h5>
                </div>
                <div className="align-self-center">
                  <input placeholder="Search books here...." style={{ width: "250px"}} className="form-control"/>
                </div>
              </div>

              {/* list of books*/}
              {this.books}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
