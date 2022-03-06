import React, { Component } from 'react';
import { MdEdit, MdInfo } from 'react-icons/md';
import { BiCalendarPlus } from 'react-icons/bi';
import { MAIN_URL, loader, tellUser } from '../Helper';
import $ from 'jquery';

export default class OneStudent extends Component{

  updateStudent = () => {
    let admissionNo = $("#__admissionNo"+this.props.data.id).val();
    let firstName = $("#__firstName"+this.props.data.id).val();
    let lastName = $("#__lastName"+this.props.data.id).val();

    if(admissionNo.trim().length > 0){
      if(firstName.trim().length > 0){
        if(lastName.trim().length > 0){
          loader(true);
          $.post(MAIN_URL+'update_student.php', { studentId:this.props.data.id, admissionNo, firstName, lastName }, (data, status) => {
            loader(false);
            if(status === 'success'){
              let response = JSON.parse(data);
              if(response.status === 1){
                tellUser('Changes were saved...');
                this.props.getAllStudents();
                $('.modalCloser').click();
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
          tellUser('Invalid last name');
        }
      }
      else{
        tellUser('Invalid first name');
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
                <h4 style={{ fontWeight:"300" }}><b>Student Details</b></h4><hr/>
                <h6 style={{ fontWeight:"300"}}>Full Name</h6>
                <h5>{this.props.data.firstName+" "+this.props.data.lastName}</h5>
                <h6 style={{ fontWeight:"300"}}>Admission Number</h6>
                <h5>{this.props.data.admissionNo}</h5>
                <hr/><br/>
                <h5>Books in possesion</h5>
                {
                  (this.props.data.bookCollection.length > 0) ?
                  <ul>
                  {this.props.data.bookCollection.map((item, i) => { return (<li key={i}>{item.title}</li>)})}
                  </ul>
                  :
                  <h6 style={{ fontWeight:"300"}}>No books were found</h6>
                }

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
                <h4 style={{ fontWeight:"300" }}><b>Edit student</b></h4><hr/>
                <div className="form-group">
                  <label>Admission Number</label>
                  <input readOnly={true} id={"__admissionNo"+this.props.data.id} className="form-control" defaultValue={this.props.data.admissionNo} />
                </div>
                <div className="form-group">
                  <label>First Name</label>
                  <input id={"__firstName"+this.props.data.id} className="form-control" defaultValue={this.props.data.firstName} />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input id={"__lastName"+this.props.data.id} className="form-control" defaultValue={this.props.data.lastName} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-sm modalCloser" data-dismiss="modal" style={{ width:"100px", color: "var(--dark)" }}><b>Close</b></button>
                <button onClick={() => this.updateStudent()} type="button" className="btn btn-sm btn-dark" style={{ width:"100px" }}>Save</button>
              </div>
            </div>
          </div>
        </div>
        {/* editModal ends */}


        <div className="OneBook">
          <h4 className="title">{this.props.data.firstName+" "+this.props.data.lastName}</h4>
          <h4 className="type">{this.props.data.admissionNo}</h4>

          <div className="text-right" style={{ width:"100%" }}>
            <button data-toggle="modal" data-target={"#editModal"+this.props.data.id} className="btn"><MdEdit className="mIcon"/></button>
            <button data-toggle="modal" data-target={"#infoModal"+this.props.data.id} className="btn"><MdInfo className="mIcon"/></button>
          </div>
        </div>
      </div>
    );
  }
}
