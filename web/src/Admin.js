import React, { Component } from 'react';
import MainLoader from './components/MainLoader';
import Footer from './components/Footer';
import TopBar from './components/TopBar';
import { MAIN_URL, APP_NAME, loader, tellUser } from './Helper';
import $ from 'jquery';

class App extends Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){
    loader(false);
  }


  getView = () => {
    return (
      <div className="MainBody">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 sideBar">
              <div className="d-flex flex-wrap">
                <div className="item"></div>
                <div className="item"></div>
                <div className="item"></div>
                <div className="item"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render(){
    let view = this.getView();
    return (
      <div className="App">
        <TopBar/>
        <MainLoader/>
        {view}
        <Footer/>
      </div>
    );
  }
}
export default App;
