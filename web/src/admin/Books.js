import React, { Component } from 'react';
import { MdPerson } from 'react-icons/md';
import { ImBooks } from 'react-icons/im';
import { CgPlayListAdd } from 'react-icons/cg';
import OneBook from './OneBook';

export default class Books extends Component{
  render(){
    return (
      <div className="Books">
        {/* addbookModal */}
        <h3 className="sectionTitle">Books</h3><hr/>
        <div className="row">
          <div className="col-md-6 col-sm-12 p-2">
            <button className="btn btn-success btn-block" style={{ height:"200px", overflow:"hidden"}}>
              <div className="row">
                <div className="col-6">
                  <ImBooks style={{ width:"150px", height:"150px"}}/>
                </div>
                <div className="col-6">
                  <h1 style={{ lineHeight:"150px", fontSize:"50px" }}>100000</h1>
                </div>
              </div>
            </button>
          </div>

          <div className="col-md-6 col-sm-12 p-2">
            <button className="btn btn-info btn-block" style={{ height:"200px", overflow:"hidden"}}>
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
            <OneBook/>
            <OneBook/>
            <OneBook/>
            <OneBook/>
          </div>
        </div>
      </div>
    );
  }
}
