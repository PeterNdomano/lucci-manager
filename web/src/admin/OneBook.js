import React, { Component } from 'react';
import { MdEdit, MdInfo } from 'react-icons/md';
import { BiCalendarPlus } from 'react-icons/bi';
import { MAIN_URL, loader, tellUser } from '../Helper';
import $ from 'jquery';

export default class OneBook extends Component{

  updateBook = () => {
    let title = $('#__title'+this.props.data.id).val();
    let category = $('#__category'+this.props.data.id).val();

    if(title.trim().length > 0){
      if(category.trim().length > 0){
        loader(true);
        $.post(MAIN_URL+'update_book.php', { bookId: this.props.data.id, title, category}, (data, status) => {
          loader(false);
          if(status === 'success'){
            let response = JSON.parse(data);
            if(response.status === 1){
              tellUser('Changes were saved');
              $('.modalCloser').click();
              this.props.getAllBooks();
            }
            else{
              tellUser(response.msg);
            }
          }
          else{
            tellUser('unknown error occured');
          }
        });
      }
      else{
        tellUser('Invalid category');
      }
    }
    else{
      tellUser('Invalid title');
    }
  }

  lendBook = () => {
    let admissionNo = $('#__admissionNo'+this.props.data.id).val();
    let from = $('#__from'+this.props.data.id).val();
    let to = $('#__to'+this.props.data.id).val();

    if(admissionNo.trim().length > 0){
      if(from.trim().length > 0){
        if(to.trim().length > 0){
          loader(true);
          $.post(MAIN_URL+'lend_book.php', { admissionNo, from, to, bookId:this.props.data.id}, (data, status) => {
            loader(false);
            //console.log(data);
            if(status === 'success'){
              let response = JSON.parse(data);
              if(response.status === 1){
                tellUser('Lending Successful....');
                $('.modalCloser').click();

                $('#__admissionNo'+this.props.data.id).val('');
                $('#__from'+this.props.data.id).val('');
                $('#__to'+this.props.data.id).val('');
              }
              else{
                tellUser(response.msg);
              }
            }
            else{
              tellUser('Unkown network error');
            }
          });
        }
        else{
          tellUser('Invalid to date');
        }
      }
      else{
        tellUser('Invalid from date');
      }
    }
    else{
      tellUser('Invalid admission number');
    }
  }


  render(){
    return (
      <div>
        {/* infoModal */}
        <div className="modal fade" id={"infoModal"+this.props.data.id} tabIndex="-1" role="dialog" aria-labelledby={"infoModal"+this.props.data.id} aria-hidden="true">
          <div className="modal-dialog modal-md modal-dialog-centered" role="document">
            <div className="modal-content">

              <div className="modal-body" style={{color: "var(--darkColor)"}}>
                <h4 style={{ fontWeight:"300" }}><b>Book Details</b></h4><hr/>
                <h6 style={{ fontWeight:"300"}}>Title</h6>
                <h5>{this.props.data.title}</h5>
                <h6 style={{ fontWeight:"300"}}>Category</h6>
                <h5>{this.props.data.category}</h5>
                <h6 style={{ fontWeight:"300"}}>Type</h6>
                <h5>{this.props.data.type}</h5>
                {
                  (this.props.data.type === 'soft copy') ?
                  <div>
                  <h6 style={{ fontWeight:"300"}}>Download Link</h6>
                  <h5>{MAIN_URL+this.props.data.file}</h5>
                  </div>
                  :
                  ''
                }
                <h6 style={{ fontWeight:"300"}}>Date Recorded</h6>
                <h5>{this.props.data.date}</h5>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-sm modalCloser" data-dismiss="modal" style={{ width:"100px", color: "var(--dark)" }}><b>Close</b></button>
              </div>
            </div>
          </div>
        </div>
        {/* infoModal ends */}

        {/* editModal */}
        <div className="modal fade" id={"editModal"+this.props.data.id} tabIndex="-1" role="dialog" aria-labelledby={"editModal"+this.props.data.id} aria-hidden="true">
          <div className="modal-dialog modal-md modal-dialog-centered" role="document">
            <div className="modal-content">

              <div className="modal-body" style={{color: "var(--darkColor)"}}>
                <h4 style={{ fontWeight:"300" }}><b>Edit Book Details</b></h4><hr/>
                <div className="form-group">
                  <label>Title</label>
                  <input id={"__title"+this.props.data.id} className="form-control" defaultValue={this.props.data.title} />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input id={"__category"+this.props.data.id} className="form-control" defaultValue={this.props.data.category} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-sm modalCloser" data-dismiss="modal" style={{ width:"100px", color: "var(--dark)" }}><b>Close</b></button>
                <button onClick={() => this.updateBook()} type="button" className="btn btn-sm btn-dark" style={{ width:"100px" }}>Save</button>
              </div>
            </div>
          </div>
        </div>
        {/* editModal ends */}

        {/* lendModal */}
        <div className="modal fade" id={"lendModal"+this.props.data.id} tabIndex="-1" role="dialog" aria-labelledby={"lendModal"+this.props.data.id} aria-hidden="true">
          <div className="modal-dialog modal-md modal-dialog-centered" role="document">
            <div className="modal-content">

              <div className="modal-body" style={{color: "var(--darkColor)"}}>
                <h4 style={{ fontWeight:"300" }}><b>Lend This Book</b></h4><hr/>

                <div className="form-group">
                  <label>Student Admission Number</label>
                  <input id={"__admissionNo"+this.props.data.id} className="form-control" type="text"/>
                </div>
                <div className="row">
                  <div className="col-6">
                    <label>From</label>
                    <input id={"__from"+this.props.data.id} className="form-control" type="date"/>
                  </div>
                  <div className="col-6">
                    <label>To</label>
                    <input id={"__to"+this.props.data.id} className="form-control" type="date"/>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-sm modalCloser" data-dismiss="modal" style={{ width:"100px", color: "var(--dark)" }}><b>Close</b></button>
                <button onClick={() => this.lendBook()} type="button" className="btn btn-sm btn-dark" style={{ width:"100px" }}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
        {/* lendModal ends */}

        <div className="OneBook">
          <h4 className="title">{this.props.data.title}</h4>
          <h4 className="type">{this.props.data.type}</h4>
          <h4 className="category"><i>{this.props.data.category}</i></h4>

          <div className="text-right" style={{ width:"100%" }}>
            <button data-toggle="modal" data-target={"#editModal"+this.props.data.id} className="btn"><MdEdit className="mIcon"/></button>
            <button data-toggle="modal" data-target={"#lendModal"+this.props.data.id} className="btn"><BiCalendarPlus className="mIcon"/></button>
            <button data-toggle="modal" data-target={"#infoModal"+this.props.data.id} className="btn"><MdInfo className="mIcon"/></button>
          </div>
        </div>
      </div>
    );
  }
}
