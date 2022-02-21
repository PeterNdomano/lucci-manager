import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

class MainLoader extends Component{
  render(){
    return (
      <div className="Loader" id="mainLoader">
        <div
          className="text-center"
          style={{
            width: '100%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
          <Loader
            type="Bars"
            color="black"
            height={50}
            width={80}
            />
        </div>
      </div>
    )
  }
}

export default MainLoader;
