import React, { Component } from 'react';
import { APP_NAME } from '../Helper';
import Books from './Books';
import Settings from './Settings';


class Body extends Component{

  renderBooks(){
    return (
    <div className="Body">
      <div className="container">
       <div className="card">
        <div className="card-body">
          <Books/>
        </div>
       </div>
      </div>
    </div>
    )
  }

  renderSettings(){
    return (
    <div className="Body">
      <div className="container">
       <div className="card">
        <div className="card-body">
          <Settings/>
        </div>
       </div>
      </div>
    </div>
    )
  }

  render(){
    if(this.props.navTo === 'books'){
       return this.renderBooks();
    }
    else if(this.props.navTo === 'settings'){
       return this.renderSettings();
    }
  }
}

export default Body;
