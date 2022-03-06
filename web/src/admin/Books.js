import React, { Component } from 'react';
import { MdPerson } from 'react-icons/md';
import { ImBooks } from 'react-icons/im';
import { CgPlayListAdd } from 'react-icons/cg';
import OneBook from './OneBook';
import { tellUser, MAIN_URL, loader } from '../Helper';
import $ from 'jquery';

export default class Books extends Component{
  constructor(props){
    super(props);
    this.state = {
      books: [],
    };
    this.books = <div></div>;

  }

  componentDidMount(){
    this.getAllBooks();
  }

  getAllBooks = () => {
    loader(true);
    $.post(MAIN_URL+'get_all_books.php', {}, (data, status) => {
      loader(false);
      if(status === 'success'){
        let response = JSON.parse(data);
        if(response.status === 1){
          this.books = response.books.map((item) => {
            return (
              <OneBook getAllBooks={this.getAllBooks} key={"bk_"+item.id} data={item}/>
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

  showFileField = () => {
    let type = $('#_type').val();
    if(type === 'soft copy'){
      document.getElementById('fileField').style.display = 'block';
    }
    else{
      document.getElementById('fileField').style.display = 'none';
    }
  }

  fileChecker = (type, file) => {
    if(type === 'hard copy'){
      return true;
    }
    else{
      if(type === 'soft copy' && file != null){
        return true;
      }
      else{
        return false;
      }
    }
  }

  addBook = () => {
    let title = $('#_title').val();
    let type = $('#_type').val();
    let category = $('#_category').val();
    let file = document.getElementById('_file').files[0];

    if(title.trim().length > 0){
      if(type.trim().length > 0){
        if(category.trim().length > 0){
          if(this.fileChecker(type, file)){
            let formData = new FormData();
            formData.append('title', title);
            formData.append('type', type);
            formData.append('category', category);
            formData.append('file', file);

            $.ajax({
              type:"POST",
              url: MAIN_URL+"add_book.php",
              processData: false,
              contentType: false,
              data: formData,
              beforeSend: () => {
                loader(true);
              },
              error: () => {
                tellUser('unknown error, check your connection');
              },
              success: (data) => {
                //console.log(data);
                loader(false);
                let response = JSON.parse(data);
                if(response.status === 1){
                  tellUser('Book was recorded');
                  window.location.reload();
                }
                else{
                  tellUser(response.msg);
                }
              }
            });
          }
          else{
            tellUser('Select a pdf file please');
          }
        }
        else{
          tellUser('Invalid category');
        }
      }
      else{
        tellUser('Invalid type');
      }
    }
    else{
      tellUser('Invalid title');
    }
  }

  render(){
    return (
      <div className="Books">
        {/* addbookModal */}
        <div className="modal fade" id="addBookModal" tabIndex="-1" role="dialog" aria-labelledby="adBookModal" aria-hidden="true">
          <div className="modal-dialog modal-md modal-dialog-centered" role="document">
            <div className="modal-content">

              <div className="modal-body" style={{color: "var(--darkColor)"}}>
                <h4 style={{ fontWeight:"300" }}><b>Record New Book</b></h4><hr/>

                <div className="form-group">
                  <label>Title</label>
                  <input id="_title" className="form-control" type="text"/>
                </div>
                <div className="row">
                  <div className="col-6">
                    <label>Type</label>
                    <select onChange={() => this.showFileField()} id="_type" className="form-control" type="text">
                      <option value="hard copy">Hard copy</option>
                      <option value="soft copy">Soft copy</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label>Category</label>
                    <input id="_category" className="form-control" type="text"/>
                  </div>
                </div>
                <div className="form-group" id="fileField" style={{ display:"none"}}>
                  <label>File (PDF only)</label>
                  <input id="_file" className="form-control" type="file"/>
                </div>
              </div>
              <div className="modal-footer">
                <button id="adderCloser" type="button" className="btn btn-sm" data-dismiss="modal" style={{ width:"100px", color: "var(--dark)" }}><b>Cancel</b></button>
                <button onClick={() => this.addBook()} type="button" className="btn btn-sm btn-dark" style={{ width:"100px" }}>Save</button>
              </div>
            </div>
          </div>
        </div>
        {/* addbookModal ends */}
        <h3 className="sectionTitle">Books</h3><hr/>
        <div className="row">
          <div className="col-md-6 col-sm-12 p-2">
            <button className="btn btn-success btn-block" style={{ height:"200px", overflow:"hidden"}}>
              <div className="row">
                <div className="col-6">
                  <ImBooks style={{ width:"150px", height:"150px"}}/>
                </div>
                <div className="col-6">
                  <h1 style={{ lineHeight:"150px", fontSize:"50px" }}>{this.state.books.length}</h1>
                </div>
              </div>
            </button>
          </div>

          <div className="col-md-6 col-sm-12 p-2">
            <button data-toggle="modal" data-target="#addBookModal" className="btn btn-info btn-block" style={{ height:"200px", overflow:"hidden"}}>
              <div className="row">
                <div className="col-6">
                  <CgPlayListAdd style={{ width:"150px", height:"150px"}}/>
                </div>
                <div className="col-6">
                  <h4 style={{ lineHeight:"150px" }}>Add New Book</h4>
                </div>
              </div>
            </button>
          </div>

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
    );
  }
}
