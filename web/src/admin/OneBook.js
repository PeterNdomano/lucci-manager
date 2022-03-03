import React, { Component } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

export default class OneBook extends Component{


  render(){
    return (
      <div className="OneBook">
        <h4 className="title">Title</h4>
        <h4 className="type">Type</h4>
        <h4 className="category"><i>Category</i></h4>

        <div className="text-right" style={{ width:"100%" }}>
          <button className="btn"><MdEdit className="mIcon"/></button>
          <button className="btn"><MdDelete className="mIcon"/></button>
        </div>
      </div>
    );
  }
}
