import React, { Component } from 'react';
//import { MdView } from 'react-icons/md';
import { BiCalendarPlus } from 'react-icons/bi';
import { MAIN_URL, loader, tellUser } from '../Helper';
import $ from 'jquery';

export default class OneBook extends Component{


  render(){
    return (
      <div className="OneBook">
        <h4 className="title">{this.props.data.title}</h4>
        <h4 className="type">{this.props.data.type}</h4>
        <h4 className="category"><i>{this.props.data.category}</i></h4>

        <div className="text-right" style={{ width:"100%" }}>
        {
          (this.props.data.type === 'soft copy')
          ?
          <button onClick={() => this.props.readerCallback(this.props.data.file) } className="btn btn-info">Read Now</button>
          :
          ''
        }
        </div>
      </div>
    );
  }
}
