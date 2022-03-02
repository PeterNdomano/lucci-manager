import React, { Component } from 'react';
import { MdPerson } from 'react-icons/md';
import { ImBooks } from 'react-icons/im';

export default class Books extends Component{
  render(){
    return (
      <div className="Books">
        <h3 className="sectionTitle">Books</h3><hr/>
        <div className="row">
          <div className="col-md-6 col-sm-12 p-2">
            <button className="btn btn-success btn-block" style={{ height:"200px", overflow:"hidden"}}>
              <div className="row">
                <div className="col-6">
                  <ImBooks style={{ width:"150px", height:"150px"}}/>
                </div>
                <div className="col-6">
                  <h1 style={{ lineHeight:"150px" }}>333333</h1>
                </div>
              </div>
            </button>
          </div>

          <div className="col-md-6 col-sm-12 p-2">
            <button className="btn btn-success btn-block" style={{ height:"200px", overflow:"hidden"}}>
              <div className="row">
                <div className="col-6">
                  <ImBooks style={{ width:"150px", height:"150px"}}/>
                </div>
                <div className="col-6">
                  <h1 style={{ lineHeight:"150px" }}>333333</h1>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
