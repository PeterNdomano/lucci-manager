import React, { Component } from 'react';
import { APP_NAME } from '../Helper';

class TopBar extends Component{
  render(){
    return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#">{APP_NAME}</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">Books</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Students</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Staff</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Settings</a>
            </li>
            <li className="nav-item">
              <a className="nav-link btn btn-outline-danger" style={{ color:"var(--danger)"}} href="#">Log Out</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    )
  }
}

export default TopBar;
